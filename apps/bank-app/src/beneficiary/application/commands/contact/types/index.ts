import { IDomainError } from '@clean-rn/ddd';
import {
  IContact,
  IContactAddCommand,
  IContactErrorMessage,
  IContactErrorCodes,
} from '@clean-rn/contact/domain';

export enum IContactTypes {
  CONTACT_ADD = 'CONTACT_ADD',
  CONTACT_ADD_FAILED = 'CONTACT_ADD_FAILED',
  CONTACT_LIST = 'CONTACT_LIST',
  CONTACT_LIST_DONE = 'CONTACT_LIST_DONE',
  CONTACT_LIST_INIT = 'INITIALIZE_CONTACT_LIST',
}

export type IContactAdd = {
  type: typeof IContactTypes.CONTACT_ADD;
  payload: IContactAddCommand;
};

export type IContactAddFailed = {
  type: typeof IContactTypes.CONTACT_ADD_FAILED;
  payload: IDomainError<IContactErrorCodes, IContactErrorMessage>;
};

export type IContactList = {
  type: typeof IContactTypes.CONTACT_LIST;
};

export type IContactListDone = {
  type: typeof IContactTypes.CONTACT_LIST_DONE;
  payload: IContact[];
};

export type IContactListInit = {
  type: typeof IContactTypes.CONTACT_LIST_INIT;
};

export type IContactActions =
  | IContactAdd
  | IContactAddFailed
  | IContactList
  | IContactListDone
  | IContactListInit;
