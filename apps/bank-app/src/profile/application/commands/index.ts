import { IPhoneNotifications, IEmailNotifications } from '@clean-rn/profile/domain';
import {
  IFetchUpdateNotifications,
  IResetNotifications,
  INotificationsUpdated,
  IProfileTypes,
  IProfileActions,
} from './types';

// redux actions that are commands
export const resetNotifications = (): IResetNotifications => ({
  type: IProfileTypes.RESET_NOTIFICATIONS,
});

export const fetchUpdateNotifications = (payload: {
  phoneNotificationsDisabled?: IPhoneNotifications[];
  emailNotificationsDisabled?: IEmailNotifications[];
}): IFetchUpdateNotifications => ({
  type: IProfileTypes.FETCH_UPDATE_NOTIFICATIONS,
  payload,
});

// redux actions that are domain Events
export const notificationUpdated = (payload: {
  phoneNotificationsDisabled?: IPhoneNotifications[];
  emailNotificationsDisabled?: IEmailNotifications[];
}): INotificationsUpdated => ({
  type: IProfileTypes.NOTIFICATIONS_UPDATED,
  payload,
});

export { IProfileTypes, IProfileActions };
