import { IUserProperties } from '../entities';

export interface IUserRepository {
  createUser(user: IUserProperties): Promise<IUserProperties>; //user as an aggregate Entity class, with IUserProperties
  getUser(): Promise<IUserProperties>;
}
