import { HttpConnection, IHttpVerb, ServerError } from '@clean-rn/shared/infrastructure';
import {
  User,
  IUserRepository,
  IUserGateway,
  ISearchEmailQuery,
  ISearchPhoneQuery,
  IValidatePhoneQuery,
  ISuccess,
  ISendPhoneValidationCommand,
  IUpdateUserConfigCommand,
  IUpdateUserCommand,
  ISignupUserCommand,
  UserError,
} from '@clean-rn/user/domain';
import { IAuth } from '@clean-rn/auth/domain';
import { UserMapper } from '../mappers';

export class UserApi implements IUserRepository, IUserGateway {
  private static instance: UserApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.searchEmail = this.searchEmail.bind(this);
    this.searchPhone = this.searchPhone.bind(this);
    this.sendPhoneValidation = this.sendPhoneValidation.bind(this);
    this.checkPhoneValidation = this.checkPhoneValidation.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUserAccount = this.deleteUserAccount.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): UserApi {
    if (!this.instance) {
      this.instance = new UserApi(httpConnection);
    }
    return this.instance;
  }

  async getUser(): Promise<User> {
    //map cmd to dto
    const response = await fetch(
      `${this.connection.baseUrl}/app/user`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const result = await response.json();
    return UserMapper.toDomain(result);
  }

  async createUser(cmd: ISignupUserCommand): Promise<IAuth> {
    try {
      const createUserDto = UserMapper.toCreateUserDto(cmd);
      const response = await fetch(
        `${this.connection.baseUrl}/app/user`,
        this.connection.options(IHttpVerb.POST, createUserDto),
      );
      await this.connection.handleError(response);
      return response.json();
    } catch (error) {
      if (error instanceof ServerError && error.statusCode === 400) {
        throw new UserError.SignupFailure(error);
      }
      throw error;
    }
  }

  async searchEmail(query: ISearchEmailQuery): Promise<ISuccess> {
    //map query to dto
    const params = {
      email: query.email.value,
    };
    const url = `${this.connection.baseUrl}/app/user/search?` + new URLSearchParams(params);
    const response = await fetch(url, this.connection.options(IHttpVerb.GET));
    await this.connection.handleError(response);
    return response.json();
  }

  async searchPhone(query: ISearchPhoneQuery): Promise<ISuccess> {
    //map query to dto
    const params = {
      phone: query.phone.valueInternational.replace('+', ''),
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
      phone: query.phone.valueInternational.replace('+', ''),
      code: query.phoneOtp.value,
    };

    const url = `${this.connection.baseUrl}/app/user/checkPhoneValidationCode?` + new URLSearchParams(params);

    const response = await fetch(url, this.connection.options(IHttpVerb.GET));
    await this.connection.handleError(response);
    return response.json();
  }

  async updateConfig(cmd: IUpdateUserConfigCommand): Promise<User> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/user/updateConfig`,
      this.connection.options(IHttpVerb.PUT, cmd),
    );
    await this.connection.handleError(response);
    const userServer = await response.json();
    return UserMapper.toDomain(userServer);
  }

  async updateUser(cmd: IUpdateUserCommand): Promise<User> {
    console.log('------ cmd', cmd);

    let params = {};
    if (cmd.firstName) {
      params = {
        ...params,
        firstname: cmd.firstName,
      };
    }
    if (cmd.lastName) {
      params = {
        ...params,
        lastname: cmd.lastName,
      };
    }
    if (cmd.birthDay) {
      params = {
        ...params,
        birthday: cmd.birthDay.value,
      };
    }
    if (cmd.birthCountry) {
      params = {
        ...params,
        birthCountry: cmd.birthCountry.value,
      };
    }
    if (cmd.nationality) {
      params = {
        ...params,
        nationality: cmd.nationality.value,
      };
    }
    if (cmd.address) {
      params = {
        ...params,
        address: {
          ...cmd.address,
          country: cmd.address?.country?.value,
        },
      };
    }
    if (cmd.USPerson !== undefined) {
      params = {
        ...params,
        specifiedUSPerson: cmd.USPerson ? 1 : 0,
      };
    }
    if (cmd.revenues) {
      params = {
        ...params,
        monthlyIncomeRange: cmd.revenues.income,
        personalAssetsRange: cmd.revenues.assets,
        occupationCategory: cmd.revenues.occupation,
      };
    }
    const response = await fetch(
      `${this.connection.baseUrl}/app/user`,
      this.connection.options(IHttpVerb.PUT, params),
    );
    await this.connection.handleError(response);
    const userServer = await response.json();
    return UserMapper.toDomain(userServer);
  }

  async deleteUserAccount(): Promise<ISuccess> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/user/unsubscribe`,
      this.connection.options(IHttpVerb.PUT),
    );
    await this.connection.handleError(response);
    return response.json();
  }
}
