import { IUserActions, IUserTypes } from '../../commands';
import { IUserState } from '../state';

const initialState: IUserState = {
  pending: false,
  email: null,
  phone: null,
  phoneOtp: null,
  user: null,
  error: null,
  config: null,
};

export const userReducer = (state = initialState, action: IUserActions) => {
  let newState: IUserState;
  switch (action.type) {
    case IUserTypes.FETCH_SEARCH_EMAIL:
      newState = {
        ...state,
        pending: true,
        email: action.payload.email,
        error: null,
      };
      return newState;
    case IUserTypes.EMAIL_NOT_FOUND:
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    case IUserTypes.SIGNUP_FAILED:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IUserTypes.FETCH_SEARCH_PHONE:
      newState = {
        ...state,
        pending: true,
        phone: action.payload.phone,
        error: null,
      };
      return newState;
    case IUserTypes.PHONE_NOT_FOUND:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IUserTypes.PHONE_CODE_SENT:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case IUserTypes.FETCH_VALIDATE_PHONE:
      newState = {
        ...state,
        pending: true,
        phoneOtp: action.payload.phoneOtp,
        error: null,
      };
      return newState;
    case IUserTypes.PHONE_VALIDATED:
      newState = {
        ...state,
        pending: false,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.IDENTITY_REGISTERED:
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.PASSWORD_REGISTERED:
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.BIRTH_REGISTERED:
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.ADDRESS_REGISTERED:
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.FETCH_SIGNUP_USER:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IUserTypes.FETCH_DELETE_USER_ACCOUNT:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IUserTypes.USER_SIGNED_UP:
      newState = {
        ...state,
        pending: false,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.FETCH_UPDATE_NOTIFICATIONS:
      newState = {
        ...state,
        pending: true,
        config: {
          ...state.config,
          notifEmailDisabled: action.payload.notifEmailDisabled,
          notifFirebaseDisabled: action.payload.notifFirebaseDisabled,
        },
        error: null,
      };
      return newState;
    case IUserTypes.FETCH_UPDATE_LANGUAGE:
      newState = {
        ...state,
        pending: true,
        config: {
          ...state.config,
          lang: action.payload.lang,
        },
        error: null,
      };
      return newState;
    case IUserTypes.NOTIFICATIONS_UPDATED:
      newState = {
        ...state,
        pending: false,
        user: action.payload.user,
        error: null,
      };
      return newState;
    case IUserTypes.LANGUAGE_UPDATED:
      newState = {
        ...state,
        pending: false,
        user: action.payload.user,
        error: null,
      };
      return newState;
    case IUserTypes.USER_SAVED:
      newState = {
        ...state,
        user: action.payload,
        error: null,
      };
      return newState;
    case IUserTypes.FETCH_UPDATE_USER:
      newState = {
        ...state,
        pending: true,
        error: null,
      };
      return newState;
    case IUserTypes.USER_UPDATED:
      newState = {
        ...state,
        user: action.payload,
        pending: false,
        error: null,
      };
      return newState;
    case IUserTypes.USER_NOT_CREATED:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    case IUserTypes.INITIALIZE_USER:
      newState = {
        ...state,
        ...initialState,
      };
      return newState;
    case IUserTypes.RESET_ERROR:
      newState = {
        ...state,
        pending: false,
        error: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
