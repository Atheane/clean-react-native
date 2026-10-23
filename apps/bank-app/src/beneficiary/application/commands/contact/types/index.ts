import {
  IContact,
  IAddContactCommand,
  IContactErrorCodes,
  IContactErrorMessage,
} from '@clean-rn/contact/domain';
import { IDomainError } from '@clean-rn/ddd';

export enum IContactTypes {
  //commands
  ADD_CONTACT = 'ADD_CONTACT',
  LIST_CONTACTS = 'LIST_CONTACTS',
  INIT_CONTACT = 'INIT_CONTACT',
  // domain Events
  CONTACT_ADDED = 'CONTACT_ADDED',
  CONTACT_ADD_FAILED = 'CONTACT_ADD_FAILED',
  CONTACTS_LISTED = 'CONTACTS_LISTED',
}

// commands
export type IAddContact = {
  type: typeof IContactTypes.ADD_CONTACT;
  payload: IAddContactCommand;
};

export type IListContacts = {
  type: typeof IContactTypes.LIST_CONTACTS;
};

export type IInitContact = {
  type: typeof IContactTypes.INIT_CONTACT;
};

//domain Events
export type IContactAdded = {
  type: typeof IContactTypes.CONTACT_ADDED;
  payload: IContact;
};

export type IContactAddedFailed = {
  type: typeof IContactTypes.CONTACT_ADD_FAILED;
  payload: IDomainError<IContactErrorCodes, IContactErrorMessage>;
};

export type IContactsListed = {
  type: typeof IContactTypes.CONTACTS_LISTED;
  payload: IContact[];
};

export type IContactActions =
  | IAddContact
  | IListContacts
  | IInitContact
  | IContactAdded
  | IContactAddedFailed
  | IContactsListed;
