import { Entity } from '@clean-rn/ddd';
import { IAddress, IIdentity, IBirth } from '../types';
import { Email, Phone, Password } from '../valueObjects';

export interface IUserProperties {
  email: Email;
  phone: Phone;
  password: Password;
  identity: IIdentity;
  birth: IBirth;
  address: IAddress;
  USPerson: boolean;
}

export class User extends Entity<IUserProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<IUserProperties> }) {
    super({ id, properties });
  }

  static Signup({ id, ...properties }: { id: string } & IUserProperties): User {
    const user = new User({ id, properties });
    return user;
  }
}
