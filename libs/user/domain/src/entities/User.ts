import { Entity } from '@clean-rn/ddd';
import { AuthError, Email, Password } from '@clean-rn/auth/domain';
import { Phone } from '@clean-rn/contact/domain';
import {
  IAddress,
  IIdentity,
  IBirth,
  KYC_REVIEW,
  IPhoneNotifications,
  IEmailNotifications,
  IAssets,
  IIncome,
  IOccupation,
  IUserType,
} from '../types';
import { Country, BirthDay } from '../value-objects';
import {
  IRegisterAddressCommand,
  IRegisterBirthCommand,
  IRegisterIdentityCommand,
  IRegisterRevenuesCommand,
  IUpdateUserCommand,
} from '../commands';
import { IValidatePhoneQuery } from '../queries';

export interface IUserProperties {
  email: Email;
  phone: Phone;
  password?: Password;
  identity: IIdentity;
  birth: IBirth;
  address?: IAddress;
  kycReview: KYC_REVIEW;
  kycReviewComment?: string;
  USPerson: boolean;
  config?: {
    lang: string;
    notifFirebaseDisabled: IPhoneNotifications[];
    notifMailDisabled: IEmailNotifications[];
  };
  revenues?: {
    income: IIncome;
    assets: IAssets;
    occupation: IOccupation;
  };
  userType?: IUserType;
}

export class User extends Entity<IUserProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<IUserProperties> }) {
    super({ id, properties });
  }

  static Create({ id, properties }: { id: number; properties: Partial<IUserProperties> }): User {
    return new User({ id: id.toString(), properties });
  }

  static CreateFromEmail(email: Email): User {
    if (!email) {
      throw new AuthError.InvalidEmail('Email is required');
    }
    return new User({ id: email.value, properties: { email } });
  }

  signup({ id, properties }: { id: string; properties: IUserProperties }): User {
    this.properties = properties;
    this.id = id;
    return this;
  }

  registerPassword(passwordString: string): void {
    const password = new Password(passwordString);
    this.properties.password = password;
  }

  registerIdentity(cmd: IRegisterIdentityCommand): void {
    const { gender, firstName, lastName } = cmd;
    this.properties.identity = {
      gender,
      firstName,
      lastName,
    };
  }

  validatePhone(cmd: IValidatePhoneQuery): void {
    const { phone } = cmd;
    this.properties.phone = phone;
  }

  registerBirth(cmd: IRegisterBirthCommand): void {
    const { birthday, birthCountry, nationality } = cmd;
    this.properties.birth = {
      birthday: new BirthDay(birthday),
      birthCountry: new Country(birthCountry),
      nationality: new Country(nationality),
    };
  }

  registerAddress(cmd: IRegisterAddressCommand): void {
    const { address, USPerson } = cmd;
    this.properties.address = address;
    this.properties.USPerson = USPerson;
  }

  registerRevenues(cmd: IRegisterRevenuesCommand): void {
    const { income, assets, occupation } = cmd;
    this.properties.revenues = { income, assets, occupation };
  }

  setConfig(config: {
    lang?: string;
    notifFirebaseDisabled?: IPhoneNotifications[];
    notifMailDisabled?: IEmailNotifications[];
  }): void {
    if (!config.lang && !config.notifFirebaseDisabled && !config.notifMailDisabled) {
      return;
    }
    this.properties.config = {
      lang: config.lang || 'en',
      notifFirebaseDisabled: config.notifFirebaseDisabled ?? [],
      notifMailDisabled: config.notifMailDisabled ?? [],
    };
  }

  updateUser(cmd: IUpdateUserCommand): void {
    const { firstName, lastName } = cmd;
    if (firstName && this.properties.identity && this.properties.identity.firstName !== firstName) {
      this.properties.identity.firstName = firstName;
    }
    if (lastName && this.properties.identity && this.properties.identity.lastName !== lastName) {
      this.properties.identity.lastName = lastName;
    }
  }

  setUserType(userType: IUserType): void {
    this.properties.userType = userType;
  }
}
