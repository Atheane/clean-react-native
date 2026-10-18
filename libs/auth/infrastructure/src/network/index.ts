import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import {
  IAuthGateway,
  IUserRepository,
  IAuth,
  ILoginCommand,
  IResetPasswordCommand,
  ICheckEmailQuery,
  ISuccess,
  ICheckPhoneQuery,
  IValidatePhoneQuery,
  ISendPhoneValidationCommand,
  User,
  IUserProperties,
  PhoneOtp,
  IGender,
} from '@clean-rn/auth/domain';

export class AuthApi implements IAuthGateway, IUserRepository {
  private static instance: AuthApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.login = this.login.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.searchEmail = this.searchEmail.bind(this);
    this.searchPhone = this.searchPhone.bind(this);
    this.sendPhoneValidation = this.sendPhoneValidation.bind(this);
    this.checkPhoneValidation = this.checkPhoneValidation.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): AuthApi {
    if (!this.instance) {
      this.instance = new AuthApi(httpConnection);
    }
    return this.instance;
  }

  async login(cmd: ILoginCommand): Promise<IAuth> {
    //map cmd to dto
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

  async searchEmail(query: ICheckEmailQuery): Promise<ISuccess> {
    //map query to dto
    const params = {
      email: query.email.value,
    };
    const url = `${this.connection.baseUrl}/app/user/search?` + new URLSearchParams(params);
    const response = await fetch(url, this.connection.options(IHttpVerb.GET));
    await this.connection.handleError(response);
    return response.json();
  }

  async searchPhone(query: ICheckPhoneQuery): Promise<ISuccess> {
    //map query to dto
    const params = {
      phone: query.phone.value,
    };

    const url = `${this.connection.baseUrl}/app/user/search?` + new URLSearchParams(params);

    const response = await fetch(url, this.connection.options(IHttpVerb.GET));
    await this.connection.handleError(response);
    return response.json();
  }

  async sendPhoneValidation(query: ISendPhoneValidationCommand): Promise<ISuccess> {
    //map cmd to dto
    const params = {
      phone: query.phone.valueInternational,
    };
    const response = await fetch(
      `${this.connection.baseUrl}/app/user/sendPhoneValidationCode`,
      this.connection.options(IHttpVerb.POST, params),
    );
    await this.connection.handleError(response);
    return response.json();
  }

  async checkPhoneValidation(query: IValidatePhoneQuery): Promise<ISuccess> {
    //map query to dto
    const params = {
      phone: query.phone.value,
      code: query.phoneOtp.value,
    };

    const url = `${this.connection.baseUrl}/app/user/checkPhoneValidationCode?` + new URLSearchParams(params);

    const response = await fetch(url, this.connection.options(IHttpVerb.GET));
    await this.connection.handleError(response);
    return response.json();
  }

  async createUser({ phoneOtp, ...cmd }: IUserProperties & { phoneOtp: PhoneOtp }): Promise<User> {
    //map cmd to dto
    let title: string;
    if (cmd.identity.gender === IGender.MAN) {
      title = 'M';
    } else if (cmd.identity.gender === IGender.WOMAN) {
      title = 'Mme';
    } else {
      title = 'Mlle'; // KycProvider do not have title for neutral gender. As a reminder, we use Mlle as incorrectly encoded value for neutral gender
    }
    const params = {
      email: cmd.email.value,
      title,
      firstname: cmd.identity.firstName,
      lastname: cmd.identity.lastName,
      phone: cmd.phone.valueInternational,
      password: cmd.password.value,
      birthday: cmd.birth.birthday.value,
      birthCountry: cmd.birth.birthCountry.value,
      nationality: cmd.birth.nationality.value,
      address: {
        ...cmd.address,
        country: cmd.address.country.value,
      },
      phoneValidationCode: phoneOtp.value,
      specifiedUSPerson: cmd.USPerson ? 1 : 0,
    };

    const response = await fetch(
      `${this.connection.baseUrl}/app/user`,
      this.connection.options(IHttpVerb.POST, params),
    );
    await this.connection.handleError(response);
    return response.json();
  }
}
