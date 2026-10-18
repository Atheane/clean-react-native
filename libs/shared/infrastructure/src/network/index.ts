import { IHttpVerb } from './types';

export class HttpConnection {
  private static instance: HttpConnection | null = null;
  public baseUrl: string;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public static getInstance(baseUrl: string): HttpConnection {
    if (!this.instance) {
      this.instance = new HttpConnection(baseUrl);
    }
    return this.instance;
  }

  public getDefaultHeaders(): HeadersInit {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  public options(httpVerb: IHttpVerb, params: any): RequestInit {
    return {
      method: httpVerb,
      headers: this.getDefaultHeaders(),
      body: JSON.stringify(params),
    };
  }

  public async handleError(response: Response): Promise<void> {
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || err.statusText);
    }
  }
}
