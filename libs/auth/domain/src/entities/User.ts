import { Entity } from '@clean-rn/ddd';
import { IAddress, IIdentity, IBirth } from '../types';
import { Email, Phone, Password } from '../valueObjects';

export interface IUserProperties {
  uid: number;
  email: Email;
  phone: Phone;
  password: Password;
  identity: IIdentity;
  birth: IBirth;
  address: IAddress;
}

export class User extends Entity<IUserProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<IUserProperties> }) {
    super({ id, properties });
  }

  static Signup(props: IUserProperties): User {
    const user = new User({ properties: props });
    user.id = props.uid.toString();
    return user;
  }
}
