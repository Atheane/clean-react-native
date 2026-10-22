import { ILoginCommand } from '../commands';
import { IAuth } from '../types';

export interface IAuthGateway {
  login: (cmd: ILoginCommand) => Promise<IAuth>;
  refresh: (refreshToken: string) => Promise<IAuth>;
}
