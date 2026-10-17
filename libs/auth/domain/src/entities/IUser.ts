import { Email, Phone, BirthDay, Country } from '../valueObjects';

export interface IUser {
  birthday: BirthDay;
  country: Country;
  email: Email;
  firstName: string;
  lastName: string;
  phone: Phone;
  userId: number;
}
