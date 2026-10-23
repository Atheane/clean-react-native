import {
  IContact,
  IAddContactCommand,
  IContactErrorCodes,
  IContactErrorMessage,
} from '@clean-rn/contact/domain';
//
import {
  IContactTypes,
  IAddContact,
  IListContacts,
  IContactActions,
  IContactAdded,
  IInitContact,
  IContactsListed,
  IContactAddedFailed,
  ISelectContact,
  IContactSelected,
} from './types';
import { IDomainError } from '@clean-rn/ddd';

// commands
export const addContact = (payload: IAddContactCommand): IAddContact => ({
  type: IContactTypes.ADD_CONTACT,
  payload,
});

export const listContacts = (): IListContacts => ({
  type: IContactTypes.LIST_CONTACTS,
});

export const initContact = (): IInitContact => ({
  type: IContactTypes.INIT_CONTACT,
});

export const selectContact = (payload: IContact): ISelectContact => ({
  type: IContactTypes.SELECT_CONTACT,
  payload,
});

// domain Events
export const contactAdded = (payload: IContact): IContactAdded => ({
  type: IContactTypes.CONTACT_ADDED,
  payload,
});

export const contactAddedFailed = (
  payload: IDomainError<IContactErrorCodes, IContactErrorMessage>,
): IContactAddedFailed => ({
  type: IContactTypes.CONTACT_ADD_FAILED,
  payload,
});

export const contactsListed = (payload: IContact[]): IContactsListed => ({
  type: IContactTypes.CONTACTS_LISTED,
  payload,
});

export const contactSelected = (payload: IContact): IContactSelected => ({
  type: IContactTypes.CONTACT_SELECTED,
  payload,
});

export { IContactTypes, IContactActions };
