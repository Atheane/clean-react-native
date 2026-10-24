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
  IResetError,
  IContactPermissionRefused,
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

export const resetError = (): IResetError => ({
  type: IContactTypes.RESET_ERROR,
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

export const contactPermissionRefused = (): IContactPermissionRefused => ({
  type: IContactTypes.CONTACT_PERMISSION_REFUSED,
});

export { IContactTypes, IContactActions };
