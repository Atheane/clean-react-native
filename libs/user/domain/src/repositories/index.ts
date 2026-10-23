import { IAuth, ISuccess } from '@clean-rn/auth/domain';
import { User, IUserProperties } from '../entities';

export interface IUserRepository {
  createUser(user: IUserProperties): Promise<IAuth>;
  getUser(): Promise<User>;
  deleteUserAccount(): Promise<ISuccess>;
}
