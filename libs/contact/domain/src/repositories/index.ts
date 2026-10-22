import { IContact } from '../entities';
import { IAddContactCommand } from '../commands';

export interface IContactRepository {
  getContacts(): Promise<IContact[]>;
  addContact(contact: IAddContactCommand): Promise<IContact>;
}
