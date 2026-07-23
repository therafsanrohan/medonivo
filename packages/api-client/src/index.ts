import { HealthCheckResponse } from '@medonivo/contracts';

export class MedonivoApiClient {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
  }

  public setToken(token: string) {
    this.token = token;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path.startsWith('/') ? path : '/' + path}`;
    const headers = new Headers(options.headers || {});
    headers.set('Content-Type', 'application/json');
    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorPayload = await response.json().catch(() => ({ message: 'Network request failed' }));
      throw new Error(errorPayload.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  public async getHealth(): Promise<HealthCheckResponse> {
    return this.request<HealthCheckResponse>('/v1/health');
  }
}
