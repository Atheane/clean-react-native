import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import { IAuthGateway, IAuth, ILoginCommand, IResetPasswordCommand, ISuccess } from '@clean-rn/auth/domain';

export class AuthApi implements IAuthGateway {
  private static instance: AuthApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): AuthApi {
    if (!this.instance) {
      this.instance = new AuthApi(httpConnection);
    }
    return this.instance;
  }

  async refresh(refreshToken: string): Promise<IAuth> {
    this.connection.attachBearerToken(refreshToken);
    const response = await fetch(
      `${this.connection.baseUrl}/auth/refresh`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const auth = await response.json();
    this.connection.attachBearerToken(auth.accessToken);
    return auth;
  }

  async login(cmd: ILoginCommand): Promise<IAuth> {
    //map cmd to dto
    const params = {
      email: cmd.email.value,
      password: cmd.password.value,
    };
    const response = await fetch(
      `${this.connection.baseUrl}/auth/login`,
      this.connection.options(IHttpVerb.POST, params),
    );
    await this.connection.handleError(response);
    return response.json();
  }

  async resetPassword(cmd: IResetPasswordCommand): Promise<ISuccess> {
    //map cmd to dto
    const params = {
      email: cmd.email.value,
    };
    const response = await fetch(
      `${this.connection.baseUrl}/app/user/resetPassword`,
      this.connection.options(IHttpVerb.PUT, params),
    );
    await this.connection.handleError(response);
    return response.json();
  }
}
