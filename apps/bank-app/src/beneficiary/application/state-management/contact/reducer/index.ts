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
    case IContactTypes.CONTACT_LIST:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IContactTypes.CONTACT_LIST_DONE:
      logger.debug(action.type, action.payload);
      newState = {
        ...state,
        pending: false,
        contacts: action.payload,
      };
      return newState;
    case IContactTypes.CONTACT_LIST_INIT:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        contacts: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
