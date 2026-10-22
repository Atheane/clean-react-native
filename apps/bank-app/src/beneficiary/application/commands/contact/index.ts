import { IDomainError } from '@clean-rn/ddd';
import {
  IContact,
  IContactAddCommand,
  IContactErrorMessage,
  IContactErrorCodes,
} from '@clean-rn/contact/domain';
//
import {
  IContactTypes,
  IContactAdd,
  IContactAddFailed,
  IContactList,
  IContactListDone,
  IContactListInit,
  IContactActions,
} from './types';

// commands
export const contactAdd = (payload: IContactAddCommand): IContactAdd => ({
  type: IContactTypes.CONTACT_ADD,
  payload,
});

export const contactAddFailure = (
  payload: IDomainError<IContactErrorCodes, IContactErrorMessage>,
): IContactAddFailed => ({
  type: IContactTypes.CONTACT_ADD_FAILED,
  payload,
});

export const contactList = (): IContactList => ({
  type: IContactTypes.CONTACT_LIST,
});

export const contactListInit = (): IContactListInit => ({
  type: IContactTypes.CONTACT_LIST_INIT,
});

// domainEvents
export const contactListed = (payload: IContact[]): IContactListDone => ({
  type: IContactTypes.CONTACT_LIST_DONE,
  payload,
});

export { IContactTypes, IContactActions };
