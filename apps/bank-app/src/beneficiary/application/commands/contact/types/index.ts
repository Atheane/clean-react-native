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
  LIST_CONTACT = 'LIST_CONTACT',
  INIT_CONTACT = 'INIT_CONTACT',

  // domain Events
  CONTACT_ADDED = 'CONTACT_ADDED',
  CONTACT_ADD_FAILED = 'CONTACT_ADD_FAILED',
  CONTACT_LISTED = 'CONTACT_LISTED',
}

// commands
export type IAddContact = {
  type: typeof IContactTypes.ADD_CONTACT;
  payload: IAddContactCommand;
};

export type IListContact = {
  type: typeof IContactTypes.LIST_CONTACT;
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

export type IContactListed = {
  type: typeof IContactTypes.CONTACT_LISTED;
  payload: IContact[];
};

export type IContactActions =
  | IAddContact
  | IListContact
  | IInitContact
  | IContactAdded
  | IContactAddedFailed
  | IContactListed;
