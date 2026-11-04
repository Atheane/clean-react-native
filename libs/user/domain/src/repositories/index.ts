import { IAuth, ISuccess } from '@clean-rn/auth/domain';
import { User } from '../entities';
import { ISignupUserCommand } from '../commands';

export interface IUserRepository {
  createUser(user: ISignupUserCommand): Promise<IAuth>;
  getUser(): Promise<User>;
  deleteUserAccount(): Promise<ISuccess>;
}
