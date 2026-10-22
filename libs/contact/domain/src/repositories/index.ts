import { IContact } from '../entities';

export interface IContactRepository {
  getContact(): Promise<IContact[]>;
}
