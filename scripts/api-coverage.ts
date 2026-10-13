/**
 * API endpoint coverage: compares the operations in an OpenAPI spec with the calls
 * recorded by ApiClient in test-results/api-calls.jsonl.
 *
 * Usage:
 *   npm run coverage:api -- [--spec api-specs/openapi.yaml] [--calls test-results/api-calls.jsonl]
 *                           [--base-path /api] [--min 80]
 *
 * Writes test-results/api-coverage.json and exits with code 1 when coverage is below --min.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { parse as parseYaml } from 'yaml';

interface OpenApiSpec {
  servers?: Array<{ url: string }>;
  paths?: Record<string, Record<string, unknown>>;
}

interface RecordedCall {
  method: string;
  path: string;
  status: number;
}

interface Operation {
  method: string;
  path: string;
  pattern: RegExp;
  params: number;
  hits: number;
  statuses: Set<number>;
  documentedStatuses: string[];
}

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];

const { values: args } = parseArgs({
  options: {
    spec: { type: 'string', default: 'api-specs/openapi.yaml' },
    calls: { type: 'string', default: path.join('test-results', 'api-calls.jsonl') },
    'base-path': { type: 'string' },
    min: { type: 'string' },
  },
});

const spec = parseYaml(readFileSync(args.spec, 'utf8')) as OpenApiSpec; // YAML parser also reads JSON
const basePath = args['base-path'] ?? serverBasePath(spec);
const operations = collectOperations(spec, basePath);
const calls = readCalls(args.calls);

const undocumented = new Map<string, number>();
for (const call of calls) {
  const operation = operations.find((op) => op.method === call.method && op.pattern.test(call.path));
  if (operation) {
    operation.hits += 1;
    operation.statuses.add(call.status);
  } else {
    const key = `${call.method} ${call.path}`;
    undocumented.set(key, (undocumented.get(key) ?? 0) + 1);
  }
}

const covered = operations.filter((op) => op.hits > 0);
const percent = operations.length ? Math.round((covered.length / operations.length) * 1000) / 10 : 0;

console.log(`\nAPI endpoint coverage: ${covered.length}/${operations.length} operations (${percent}%)\n`);
console.table(
  operations.map((op) => ({
    operation: `${op.method} ${op.path}`,
    hits: op.hits,
    'statuses seen': [...op.statuses].sort().join(', ') || '-',
    'documented statuses not seen': op.documentedStatuses.filter((s) => !op.statuses.has(Number(s))).join(', ') || '-',
  })),
);
if (undocumented.size) {
  console.log('Calls that match no documented operation:');
  for (const [call, count] of undocumented) console.log(`  ${call} (${count})`);
}

const reportPath = path.join('test-results', 'api-coverage.json');
mkdirSync(path.dirname(reportPath), { recursive: true });
writeFileSync(
  reportPath,
  JSON.stringify(
    {
      spec: args.spec,
      totalOperations: operations.length,
      coveredOperations: covered.length,
      percent,
      operations: operations.map((op) => ({
        method: op.method,
        path: op.path,
        hits: op.hits,
        statusesSeen: [...op.statuses].sort(),
        documentedStatuses: op.documentedStatuses,
      })),
      undocumentedCalls: Object.fromEntries(undocumented),
    },
    null,
    2,
  ),
);
console.log(`\nReport written to ${reportPath}`);

if (args.min !== undefined && percent < Number(args.min)) {
  console.error(`Coverage ${percent}% is below the minimum of ${args.min}%`);
  process.exitCode = 1;
}

function serverBasePath(openApi: OpenApiSpec): string {
  const url = openApi.servers?.[0]?.url;
  if (!url) return '';
  const pathname = new URL(url, 'http://placeholder').pathname.replace(/\/$/, '');
  return pathname === '/' ? '' : pathname;
}

function collectOperations(openApi: OpenApiSpec, prefix: string): Operation[] {
  const result: Operation[] = [];
  for (const [template, item] of Object.entries(openApi.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const definition = item[method] as { responses?: Record<string, unknown> } | undefined;
      if (!definition) continue;
      result.push({
        method: method.toUpperCase(),
        path: template,
        pattern: toPattern(prefix + template),
        params: (template.match(/\{[^}]+\}/g) ?? []).length,
        hits: 0,
        statuses: new Set(),
        documentedStatuses: Object.keys(definition.responses ?? {}).filter((s) => /^\d{3}$/.test(s)),
      });
    }
  }
  // Literal paths win over templated ones: /users/me before /users/{id}.
  return result.sort((a, b) => a.params - b.params);
}

function toPattern(template: string): RegExp {
  const escaped = template.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\{[^}]+\}/g, '[^/]+');
  return new RegExp(`^${escaped}/?$`);
}

function readCalls(file: string): RecordedCall[] {
  if (!existsSync(file)) {
    console.warn(`No recorded calls found at ${file}. Run the API tests first.`);
    return [];
  }
  return readFileSync(file, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line) as RecordedCall);
}
