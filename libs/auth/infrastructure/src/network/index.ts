import {
  IAuthGateway,
  //   IUserRepository,
  IAuth,
  ILoginCommand,
  IResetPasswordCommand,
} from '@clean-rn/auth/domain';

enum IHttpVerb {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export class AuthApi implements IAuthGateway {
  private static instance: AuthApi | null = null;
  private baseUrl: string;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.login = this.login.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  public static getInstance(baseUrl: string): AuthApi {
    if (!this.instance) {
      this.instance = new AuthApi(baseUrl);
    }
    return this.instance;
  }

  private getDefaultHeaders(): HeadersInit {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  private options(httpVerb: IHttpVerb, params: any): RequestInit {
    return {
      method: httpVerb,
      headers: this.getDefaultHeaders(),
      body: JSON.stringify(params),
    };
  }

  private async handleError(response: Response): Promise<void> {
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || err.statusText);
    }
  }

  async login(cmd: ILoginCommand): Promise<IAuth> {
    //todo mapper cmd to dto
    const params = {
      email: cmd.email.value,
      password: cmd.password,
    };
    const response = await fetch(`${this.baseUrl}/auth/login`, this.options(IHttpVerb.POST, params));
    await this.handleError(response);
    return response.json();
  }

  async resetPassword(cmd: IResetPasswordCommand): Promise<{ success: boolean }> {
    //todo mapper cmd to dto
    const params = {
      email: cmd.email.value,
    };
    const response = await fetch(
      `${this.baseUrl}/app/user/resetPassword`,
      this.options(IHttpVerb.PUT, params),
    );
    await this.handleError(response);
    return response.json();
  }
}
