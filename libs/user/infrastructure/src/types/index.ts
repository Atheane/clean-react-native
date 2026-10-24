import { IEmailNotifications, IPhoneNotifications, KYC_REVIEW } from '@clean-rn/user/domain';

export type IUserPropertiesServer = {
  email: string;
  title: string;
  firstname: string;
  lastname: string;
  phone: string;
  birthday: string;
  nationality: string;
  birthCountry: string;
  specifiedUSPerson: number;
  kycReviewComment: string;
  kycReview: KYC_REVIEW;
  userId: number;
  address: {
    country: string;
    city: string;
    str: string;
    zip: string;
  };
  config?: {
    lang: string;
    notifFirebaseDisabled: IPhoneNotifications[];
    notifMailDisabled: IEmailNotifications[];
  };
};
