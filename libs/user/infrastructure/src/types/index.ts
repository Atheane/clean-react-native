import { IEmailNotifications, IPhoneNotifications, KYC_REVIEW } from '@clean-rn/user/domain';

export type IUserDto = {
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
  monthlyIncomeRange?: APP_USER_MONTHLY_INCOME_RANGE;
  personalAssetsRange?: APP_USER_OCCUPATION;
  occupationCategory?: APP_USER_PERSONAL_ASSETS_RANGE;
};

export enum APP_USER_MONTHLY_INCOME_RANGE {
  K2 = 2, // 1000 - 1800 Euros per month
  K4 = 3, // 1801 - 3500 Euros per month
  K5 = 4, // 3501 - 5000 Euros per month
  K7 = 5, // 5001 - 6500 Euros per month
  K10 = 6, // 6501 - 10000 Euros per month
  KN = 7, //Greater than 10000 Euros per month
}

export enum APP_USER_OCCUPATION {
  UNEMPLOYED = 3, // Without professional activity
  EMPLOYEE = 5, // Employee in the private sector
  PUBLIC_EMPLOYEE = 8, // Employee and Officer in the public sector
}

export enum APP_USER_PERSONAL_ASSETS_RANGE {
  A0 = 0, //	None
  A4 = 4, //	From 150 001 Euros to 350 000 Euros
  A5 = 5, //	From 350 001 Euros to 750 000 Euros
  A6 = 6, //	From 750 001 Euros to 1 500 000 Euros
}

export type ICreateUserDto = {
  email?: string;
  title?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  password?: string;
  birthday?: string;
  birthCountry?: string;
  nationality?: string;
  address?: {
    country?: string;
    city?: string;
    str?: string;
    zip?: string;
  };
  phoneValidationCode?: number;
  monthlyIncomeRange?: APP_USER_MONTHLY_INCOME_RANGE;
  personalAssetsRange?: APP_USER_OCCUPATION;
  occupationCategory?: APP_USER_PERSONAL_ASSETS_RANGE;
};
