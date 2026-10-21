import { Logger } from '@clean-rn/logger';

import { IProfileActions, IProfileTypes } from '../../commands';
import { IProfileState } from '../state';

const initialState: IProfileState = {
  pending: false,
  phoneNotificationsDisabled: [],
  emailNotificationsDisabled: [],
};

export const profileReducer = (state = initialState, action: IProfileActions) => {
  const logger = Logger.getInstance();
  let newState: IProfileState;
  switch (action.type) {
    case IProfileTypes.FETCH_UPDATE_NOTIFICATIONS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IProfileTypes.RESET_NOTIFICATIONS:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        phoneNotificationsDisabled: [],
        emailNotificationsDisabled: [],
      };
      return newState;
    case IProfileTypes.NOTIFICATIONS_UPDATED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        phoneNotificationsDisabled: action.payload.phoneNotificationsDisabled || [],
        emailNotificationsDisabled: action.payload.emailNotificationsDisabled || [],
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
