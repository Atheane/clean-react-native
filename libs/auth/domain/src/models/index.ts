import { IAddress, IIdentity, IBirth } from '../types';
import { Email, Phone, BirthDay, Country, Password } from '../valueObjects';
import { IRegisterBirthCommand, IRegisterIdentityCommand } from '../commands';

export interface IProspectProperties {
  email: Email;
  phone?: Phone;
  password?: Password;
  identity?: IIdentity;
  birth?: IBirth;
  address?: IAddress;
}

export class Prospect {
  properties: Partial<IProspectProperties>;
  private constructor({ properties }: { properties: Partial<IProspectProperties> }) {
    this.properties = properties;
  }

  static Create(email: Email): Prospect {
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

  registerAddress(str: string, city: string, zip: string, countryString: string): void {
    this.properties.address = {
      str,
      city,
      zip,
      country: new Country(countryString),
    };
  }

  registerContact(emailString: string, phoneString: string, countryString: string): void {
    this.properties.email = new Email(emailString);
    this.properties.phone = new Phone(phoneString, countryString);
  }
}
