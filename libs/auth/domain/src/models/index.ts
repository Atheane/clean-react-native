import { IAddress, IIdentity, IBirth } from '../types';
import { Email, Phone, BirthDay, Country, Password, PhoneOtp } from '../valueObjects';
import { IRegisterAddressCommand, IRegisterBirthCommand, IRegisterIdentityCommand } from '../commands';
import { AuthError } from '../errors';
import { IValidatePhoneQuery } from '../queries';

export interface IProspectProperties {
  email: Email;
  phone?: Phone;
  password?: Password;
  identity?: IIdentity;
  birth?: IBirth;
  address?: IAddress;
  USPerson?: boolean;
  phoneOtp?: PhoneOtp;
}

export class Prospect {
  properties: Partial<IProspectProperties>;
  private constructor({ properties }: { properties: Partial<IProspectProperties> }) {
    this.properties = properties;
  }

  static Create(email: Email): Prospect {
    if (!email) {
      throw new AuthError.InvalidEmail('Email is required');
    }
    return new Prospect({ properties: { email } });
  }

  registerIdentity(cmd: IRegisterIdentityCommand): void {
    const { gender, firstName, lastName, nationality } = cmd;
    this.properties.identity = {
      gender,
      firstName,
      lastName,
      nationality: new Country(nationality),
    };
  }

  registerPassword(passwordString: string): void {
    const password = new Password(passwordString);
    this.properties.password = password;
  }

  registerBirth(cmd: IRegisterBirthCommand): void {
    const { birthday, birthCountry } = cmd;
    this.properties.birth = {
      birthday: new BirthDay(birthday),
      birthCountry: new Country(birthCountry),
    };
  }

  validatePhone(cmd: IValidatePhoneQuery): void {
    const { phone, otp } = cmd;
    this.properties.phoneOtp = otp;
    this.properties.phone = phone;
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
