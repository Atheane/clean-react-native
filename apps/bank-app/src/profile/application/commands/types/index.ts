import { IPhoneNotifications, IEmailNotifications } from '@clean-rn/profile/domain';

export enum IProfileTypes {
  // commands
  FETCH_UPDATE_NOTIFICATIONS = 'FETCH_UPDATE_NOTIFICATIONS',
  RESET_NOTIFICATIONS = 'RESET_NOTIFICATIONS',
  // domain events
  NOTIFICATIONS_UPDATED = 'NOTIFICATIONS_UPDATED',
}

// commands

export type IResetNotifications = {
  type: typeof IProfileTypes.RESET_NOTIFICATIONS;
};

export type IFetchUpdateNotifications = {
  type: typeof IProfileTypes.FETCH_UPDATE_NOTIFICATIONS;
  payload: {
    phoneNotificationsDisabled?: IPhoneNotifications[];
    emailNotificationsDisabled?: IEmailNotifications[];
  };
};

// domainEvents
export type INotificationsUpdated = {
  type: typeof IProfileTypes.NOTIFICATIONS_UPDATED;
  payload: {
    phoneNotificationsDisabled?: IPhoneNotifications[];
    emailNotificationsDisabled?: IEmailNotifications[];
  };
};

export type IProfileActions = IResetNotifications | IFetchUpdateNotifications | INotificationsUpdated;
