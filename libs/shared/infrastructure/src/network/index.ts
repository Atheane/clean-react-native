import { IHttpVerb } from './types';
import { ServerError } from './errors';

export class HttpConnection {
  private static instance: HttpConnection | null = null;
  public baseUrl: string;
  private static headers: HeadersInit & { Authorization?: string } = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public static getInstance(baseUrl: string): HttpConnection {
    if (!this.instance) {
      this.instance = new HttpConnection(baseUrl);
    }
    return this.instance;
  }

  public getDefaultHeaders(): HeadersInit & { Authorization?: string } {
    return HttpConnection.headers;
  }

  public options(httpVerb: IHttpVerb, params?: any): RequestInit {
    if (httpVerb === IHttpVerb.GET || httpVerb === IHttpVerb.DELETE) {
      return {
        method: httpVerb,
        headers: this.getDefaultHeaders(),
      };
    }
    return {
      method: httpVerb,
      headers: this.getDefaultHeaders(),
      body: JSON.stringify(params),
    };
  }

  public async handleError(response: Response): Promise<void> {
    if (!response.ok) {
      try {
        const err = await response.json();
        throw new ServerError(err);
      } catch (e: unknown) {
        throw response.status && response.statusText
          ? new ServerError({
              statusCode: response.status,
              message: response.statusText,
            })
          : e;
      }
    }
  }

  public attachBearerToken(token: string): void {
    HttpConnection.headers['Authorization'] = `Bearer ${token}`;
  }
}
