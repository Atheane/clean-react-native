import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import { User, IUserRepository, IUserProperties, PhoneOtp, IGender, IAuth } from '@clean-rn/auth/domain';
import { mapUserServerToUserProperties } from '../mappers';

export class UserApi implements IUserRepository {
  private static instance: UserApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
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
    return mapUserServerToUserProperties(result);
  }

  async createUser({ phoneOtp, ...cmd }: IUserProperties & { phoneOtp: PhoneOtp }): Promise<IAuth> {
    //map cmd to dto
    let title: string;
    if (cmd.identity.gender === IGender.MAN) {
      title = 'M';
    } else if (cmd.identity.gender === IGender.WOMAN) {
      title = 'MME';
    } else {
      title = 'MLLE'; // KycProvider do not have title for neutral gender. As a reminder, we use Mlle as incorrectly encoded value for neutral gender
    }
    const params = {
      email: cmd.email.value,
      title,
      firstname: cmd.identity.firstName,
      lastname: cmd.identity.lastName,
      phone: cmd.phone.valueInternational,
      password: cmd.password?.value,
      birthday: cmd.birth.birthday.value,
      birthCountry: cmd.birth.birthCountry?.value,
      nationality: cmd.birth.nationality.value,
      address: {
        ...cmd.address,
        country: cmd.address?.country.value,
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
