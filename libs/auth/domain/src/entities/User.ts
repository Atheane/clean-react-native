import { Entity } from '@clean-rn/ddd';
import { IAddress, IGender } from '../types';
import { Email, Phone, BirthDay, Country, Password } from '../valueObjects';
import { Dayjs } from 'dayjs';

export interface IUserProperties {
  uid: number;
  // identity:
  gender: IGender;
  firstName: string;
  lastName: string;
  nationality: Country;
  // birth:
  birthday: BirthDay;
  birthCountry: Country;
  password: Password;
  address: IAddress;
  // contact
  email: Email;
  phone: Phone;
}

export class User extends Entity<IUserProperties> {
  private constructor({ id, properties }: { id: string } & { properties: Partial<IUserProperties> }) {
    super({ id, properties });
  }

  static Signup(props: IUserProperties): User {
    return new User({ id: props.uid.toString(), properties: props });
  }

  registerIdentity(gender: IGender, firstName: string, lastName: string, nationality: Country): void {
    this.properties.gender = gender;
    this.properties.firstName = firstName;
    this.properties.lastName = lastName;
    this.properties.nationality = nationality;
  }

  registerPassword(passwordString: string): void {
    this.properties.password = new Password(passwordString);
  }

  registerBirth(dateString: Dayjs, countryStr: string): void {
    this.properties.birthday = new BirthDay(dateString);
    this.properties.birthCountry = new Country(countryStr);
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
