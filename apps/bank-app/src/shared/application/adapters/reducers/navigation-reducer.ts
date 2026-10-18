import { INavigationTypes, INavigationActions } from '../../commands/navigation';
import { INavigationState } from '../../types';

import { Logger } from '@clean-rn/ui-mobile';
import { IAuthStackPages } from '../../types';

const initialState: INavigationState = {
  navToRoute: IAuthStackPages.LOGIN,
  navToParams: null,
  navFrom: null,
};

export const navigationReducer = (state = initialState, action: INavigationActions) => {
  const logger = Logger.getInstance();
  let newState: INavigationState;
  switch (action.type) {
    case INavigationTypes.NAVIGATE_TO:
      logger.debug(action.type);
      newState = {
        ...state,
        navToRoute: action.payload.route,
        navToParams: action.payload.params || null,
        navFrom: state.navToRoute,
      };
      return newState;
    case INavigationTypes.NAVIGATE_PASSWORD_TO_LOGIN:
      logger.debug(action.type);
      newState = {
        ...state,
        navToRoute: IAuthStackPages.LOGIN,
        navFrom: state.navToRoute,
      };
      return newState;
    case INavigationTypes.NAVIGATE_BACK:
      logger.debug(action.type);
      newState = {
        ...state,
        navToRoute: 'BACK',
        navFrom: state.navToRoute,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
