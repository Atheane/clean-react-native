export enum USER_STATUS {
  PENDING = 'PENDING', // user has just been created (transient status - should not encounter)
  VALIDATED = 'VALIDATED', // user is validated
}

export type IUserPropertiesServer = {
  birthday: Date;
  email: string;
  firstname: string;
  kycReviewComment: string;
  lastname: string;
  nationality: string;
  phone: string;
  specifiedUSPerson: boolean;
  title: string;
  status: USER_STATUS;
  userId: number;
};
