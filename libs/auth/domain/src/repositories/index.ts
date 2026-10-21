import { User, IUserProperties } from '../entities';

export interface IUserRepository {
  createUser(user: IUserProperties): Promise<User>; //user as an aggregate Entity class, with IUserProperties
  getUser(): Promise<User>;
}
