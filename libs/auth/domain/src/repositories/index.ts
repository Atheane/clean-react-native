import { IUser } from '../entities';
import { Email, Phone } from '../valueObjects';

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>; //user as an aggregate Entity class, with IUserProperties
  getUserByEmail(email: Email): Promise<IUser>;
  getUserByPhone(phone: Phone): Promise<IUser>;
}
