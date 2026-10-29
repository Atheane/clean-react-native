import { IAuthTypes, IAuthActions } from '../../../commands/login/types';
import { IAuthState } from '../../state/login';

const initialState: IAuthState = {
  pending: false,
  email: null,
  password: null,
  auth: {
    accessToken: null,
    refreshToken: null,
  },
  error: null,
  success: null,
};

export const authReducer = (state = initialState, action: IAuthActions) => {
  let newState: IAuthState;
  switch (action.type) {
    case IAuthTypes.FETCH_LOGIN:
      newState = {
        ...state,
        pending: true,
        error: null,
        email: action.payload.email,
        password: action.payload.password,
      };
      return newState;
    case IAuthTypes.LOGIN_SUCCEDED:
      newState = {
        ...state,
        pending: false,
        error: null,
        auth: action.payload.auth,
      };
      return newState;
    case IAuthTypes.LOGIN_FAILED:
      newState = {
        ...state,
        pending: false,
        error: action.payload,
      };
      return newState;
    // case IAuthTypes.FETCH_LOGOUT:
    //   newState = {
    //     ...state,
    //     pending: true,
    //     success: null,
    //     error: null,
    //   };
    //   return newState;
    // case IAuthTypes.LOGGED_OUT:
    //   newState = {
    //     ...state,
    //     success: null,
    //     pending: false,
    //     error: null,
    //     auth: {
    //       accessToken: null,
    //       refreshToken: null,
    //     },
    //   };
    //   return newState;
    case IAuthTypes.INITIALIZE_AUTH:
      newState = {
        ...state,
        ...initialState,
      };
      return newState;
    case IAuthTypes.RESET_ERROR:
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
