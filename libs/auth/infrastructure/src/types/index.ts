import { KYC_REVIEW } from '@clean-rn/auth/domain';

export type IUserPropertiesServer = {
  birthday: string;
  email: string;
  firstname: string;
  kycReviewComment: string;
  lastname: string;
  nationality: string;
  phone: string;
  specifiedUSPerson: number;
  title: string;
  kycReview: KYC_REVIEW;
  userId: number;
};
