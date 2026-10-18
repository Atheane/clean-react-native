import { Entity } from '@clean-rn/ddd';
import { IAddress, IIdentity, IBirth } from '../types';
import { Email, Phone, Password, Country, BirthDay } from '../valueObjects';
import { AuthError } from '../errors';
import { IRegisterAddressCommand, IRegisterBirthCommand, IRegisterIdentityCommand } from '../commands';
import { IValidatePhoneQuery } from '../queries';

export interface IUserProperties {
  email: Email;
  phone: Phone;
  password: Password;
  identity: IIdentity;
  birth: IBirth;
  address: IAddress;
  USPerson: boolean;
}

export class User extends Entity<IUserProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<IUserProperties> }) {
    super({ id, properties });
  }

  static Create(email: Email): User {
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
    const { str, city, zip, country, USPerson } = cmd;
    this.properties.address = {
      str,
      city,
      zip,
      country: new Country(country),
    };
    this.properties.USPerson = USPerson;
  }
}
