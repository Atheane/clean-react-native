import { User, IUserProperties } from '../entities';
import { IAuth } from '../types';

export interface IUserRepository {
  createUser(user: IUserProperties): Promise<IAuth>;
  getUser(): Promise<User>;
}
