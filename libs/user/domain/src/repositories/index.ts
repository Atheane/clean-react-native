import { User, IUserProperties } from '../entities';

export interface IUserRepository {
  createUser(user: IUserProperties): Promise<User>;
  getUser(): Promise<User>;
}
