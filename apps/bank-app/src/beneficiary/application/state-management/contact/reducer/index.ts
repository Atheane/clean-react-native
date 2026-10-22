import { Logger } from '@clean-rn/logger';
import { IContact } from '@clean-rn/contact/domain';

import { IContactTypes, IContactActions } from '../../../commands/contact';
import { IContactState } from '../state';

const initialState: IContactState = {
  pending: false,
  contacts: null,
  error: null,
};

const inplaceSortByName = (contacts: any[]) => {
  contacts.sort((a: any, b: any) => {
    const nameA = a.name.toLowerCase(); // ignore upper and lowercase
    const nameB = b.name.toLowerCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

export const contactReducer = (state = initialState, action: IContactActions) => {
  const logger = Logger.getInstance();
  let newState: IContactState;
  let contacts: IContact[];
  switch (action.type) {
    case IContactTypes.ADD_CONTACT:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IContactTypes.LIST_CONTACTS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IContactTypes.INIT_CONTACT:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        contacts: null,
      };
      return newState;
    case IContactTypes.CONTACT_ADDED:
      logger.debug(action.type);
      if (state.contacts && state.contacts.length > 0) {
        contacts = [...state.contacts, action.payload];
        inplaceSortByName(contacts);
      } else {
        contacts = [action.payload];
      }
      newState = {
        ...state,
        pending: false,
        contacts: contacts,
      };
      return newState;
    case IContactTypes.CONTACT_ADD_FAILED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IContactTypes.CONTACTS_LISTED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        contacts: action.payload,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
