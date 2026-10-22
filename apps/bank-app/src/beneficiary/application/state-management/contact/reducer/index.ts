import { Logger } from '@clean-rn/logger';
//
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
  switch (action.type) {
    case IContactTypes.ADD_CONTACT:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IContactTypes.LIST_CONTACT:
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
      newState = {
        ...state,
        pending: false,
        contacts:
          state.contacts && state.contacts.length > 0
            ? [...state.contacts, action.payload]
            : [action.payload],
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
    case IContactTypes.CONTACT_LISTED:
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
