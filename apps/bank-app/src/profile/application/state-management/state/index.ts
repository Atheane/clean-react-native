import { IPhoneNotifications, IEmailNotifications } from '@clean-rn/profile/domain';

export interface IProfileState {
  pending: boolean;
  phoneNotificationsDisabled: IPhoneNotifications[] | [];
  emailNotificationsDisabled: IEmailNotifications[] | [];
}
