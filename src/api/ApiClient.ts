import { appendFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import type { APIRequestContext, APIResponse } from '@playwright/test';
import { config } from '../config';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  data?: unknown;
  params?: Record<string, string | number | boolean>;
}

/** Every call is appended here and read by scripts/api-coverage.ts. */
const CALL_LOG = path.join('test-results', 'api-calls.jsonl');

export class ApiClient {
  constructor(
    protected readonly request: APIRequestContext,
    private readonly baseUrl: string = config.apiBaseUrl,
    private readonly token: string = config.apiToken,
  ) {}

  /** `relativePath` has no leading slash, e.g. `users/42`. */
  protected async send(method: HttpMethod, relativePath: string, options: RequestOptions = {}): Promise<APIResponse> {
    const url = new URL(relativePath, this.baseUrl).toString();
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : undefined;
    const response = await this.request.fetch(url, { method, data: options.data, params: options.params, headers });
    recordCall(method, response.url(), response.status());
    return response;
  }
}

function recordCall(method: HttpMethod, url: string, status: number): void {
  mkdirSync(path.dirname(CALL_LOG), { recursive: true });
  appendFileSync(CALL_LOG, `${JSON.stringify({ method, path: new URL(url).pathname, status })}\n`);
}
