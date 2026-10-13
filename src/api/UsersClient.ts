import type { APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export type NewUser = Omit<User, 'id'>;

export class UsersClient extends ApiClient {
  list(): Promise<APIResponse> {
    return this.send('GET', 'users');
  }

  get(id: string): Promise<APIResponse> {
    return this.send('GET', `users/${encodeURIComponent(id)}`);
  }

  create(user: NewUser): Promise<APIResponse> {
    return this.send('POST', 'users', { data: user });
  }

  remove(id: string): Promise<APIResponse> {
    return this.send('DELETE', `users/${encodeURIComponent(id)}`);
  }
}
