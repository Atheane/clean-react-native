import { ISuccess } from '@clean-rn/ddd';
import { Email } from '../valueObjects';

export type ICheckEmailQuery = {
  email: Email;
};

export interface IUserRepository {
  // createUser(user: IUser): Promise<IUser>; //user as an aggregate Entity class, with IUserProperties
  searchEmail(query: ICheckEmailQuery): Promise<ISuccess>;
  // SearchPhone(phone: Phone): Promise<ISuccess>;
}
