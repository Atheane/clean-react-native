import { IEmailNotifications, IPhoneNotifications, KYC_REVIEW } from '@clean-rn/user/domain';

export type IUserPropertiesServer = {
  email: string;
  title: string;
  firstname: string;
  lastname: string;
  phone: string;
  birthday: string;
  nationality: string;
  specifiedUSPerson: number;
  kycReviewComment: string;
  kycReview: KYC_REVIEW;
  userId: number;
  config: {
    lang: string;
    notifFirebaseDisabled: IPhoneNotifications[];
    notifMailDisabled: IEmailNotifications[];
  };
};
