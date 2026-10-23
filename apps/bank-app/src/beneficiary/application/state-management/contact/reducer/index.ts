import { Logger } from '@clean-rn/logger';
import { IContact } from '@clean-rn/contact/domain';
import { inplaceSortByName } from '@clean-rn/utils';

import { IContactTypes, IContactActions } from '../../../commands/contact';
import { IContactState } from '../state';

const initialState: IContactState = {
  pending: false,
  contacts: null,
  error: null,
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
    case IContactTypes.INIT_CONTACT:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
