import {
  APP_USER_MONTHLY_INCOME_RANGE,
  APP_USER_OCCUPATION,
  APP_USER_PERSONAL_ASSETS_RANGE,
} from '@clean-rn/user/domain';

export type IRegisterRevenuesCommand = {
  income: APP_USER_MONTHLY_INCOME_RANGE;
  assets: APP_USER_PERSONAL_ASSETS_RANGE;
  occupation: APP_USER_OCCUPATION;
};
