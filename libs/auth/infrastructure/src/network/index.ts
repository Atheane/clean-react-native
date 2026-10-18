import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import {
  IAuthGateway,
  //   IUserRepository,
  IAuth,
  ILoginCommand,
  IResetPasswordCommand,
} from '@clean-rn/auth/domain';

export class AuthApi implements IAuthGateway {
  private static instance: AuthApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.login = this.login.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): AuthApi {
    if (!this.instance) {
      this.instance = new AuthApi(httpConnection);
    }
    return this.instance;
  }

  async login(cmd: ILoginCommand): Promise<IAuth> {
    //todo mapper cmd to dto
    const params = {
      email: cmd.email.value,
      password: cmd.password,
    };
    const response = await fetch(
      `${this.connection.baseUrl}/auth/login`,
      this.connection.options(IHttpVerb.POST, params),
    );
    await this.connection.handleError(response);
    return response.json();
  }

  async resetPassword(cmd: IResetPasswordCommand): Promise<{ success: boolean }> {
    //todo mapper cmd to dto
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
