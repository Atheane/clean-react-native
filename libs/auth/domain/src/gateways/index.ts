import { ILoginCommand, IResetPasswordCommand } from '../commands';
import { IAuth, ISuccess } from '../types';

export interface IAuthGateway {
  login: (cmd: ILoginCommand) => Promise<IAuth>;
  refresh: (refreshToken: string) => Promise<IAuth>;
  resetPassword: (cmd: IResetPasswordCommand) => Promise<ISuccess>;
  logout: () => Promise<ISuccess>;
}
