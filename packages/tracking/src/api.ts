import { User } from './types';

type BasicStringable =
  | string
  | number
  | boolean
  | {
      toString(): string;
    };

export class API {
  apiBaseUrl: string;
  user?: User;

  userRequest: Promise<User> | undefined;

  defaultHeaders = {
    'Content-type': 'application/json',
    Accept: 'application/json',
  };

  constructor(api_base_url: string) {
    this.apiBaseUrl = api_base_url;
  }

  async get<T>(
    endpoint: string,
    query: Record<string, BasicStringable> = {}
  ): Promise<T> {
    const headers = this.defaultHeaders;
    const uri = new URL(endpoint, this.apiBaseUrl);

    const user = await this.getCurrentUser();
    const searchParams = new URLSearchParams(uri.search);
    searchParams.set('authentication_token', user.auth_token);
    for (const [k, v] of Object.entries(query)) {
      searchParams.set(k, v.toString());
    }
    uri.search = searchParams.toString();

    const response = await fetch(uri.toString(), {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    return response.json();
  }

  async post<T>(endpoint: string, data = {}): Promise<T> {
    const headers = this.defaultHeaders;
    const uri = new URL(endpoint, this.apiBaseUrl);

    const user = await this.getCurrentUser();
    data = {
      ...data,
      authentication_token: user.auth_token,
    };

    const response = await fetch(uri.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });

    return response.json();
  }

  async beacon(endpoint: string, data: Record<string, BasicStringable>) {
    const uri = new URL(endpoint, this.apiBaseUrl);

    const user = await this.getCurrentUser();
    const searchParams = new URLSearchParams(uri.search);
    searchParams.set('authentication_token', user.auth_token);
    uri.search = searchParams.toString();

    const form = new FormData();
    for (const [k, v] of Object.entries(data)) {
      form.append(k, v.toString());
    }

    navigator.sendBeacon(uri.toString(), form);
  }

  async getCurrentUser(): Promise<User> {
    if (this.user) {
      return this.user;
    }

    // Prevent multiple concurrent requests to the user endpoint
    if (!this.userRequest) {
      this.userRequest = this.get<User>('users/web');
    }

    this.user = await this.userRequest;
    this.userRequest = undefined;

    return this.user;
  }

  setCurrentUser(user?: User) {
    this.user = user;
  }
}
