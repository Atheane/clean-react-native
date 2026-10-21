import { User, IUserProperties } from '../entities';
import { IAuth } from '../types';

export interface IUserRepository {
  createUser(user: IUserProperties): Promise<IAuth>; //user as an aggregate Entity class, with IUserProperties
  getUser(): Promise<User>;
}
