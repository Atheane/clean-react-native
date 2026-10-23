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
  let newState: IContactState;
  let contacts: IContact[];
  switch (action.type) {
    case IContactTypes.ADD_CONTACT:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IContactTypes.LIST_CONTACTS:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IContactTypes.CONTACT_ADDED:
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
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IContactTypes.CONTACTS_LISTED:
      newState = {
        ...state,
        pending: false,
        contacts: action.payload,
      };
      return newState;
    case IContactTypes.INIT_CONTACT:
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
