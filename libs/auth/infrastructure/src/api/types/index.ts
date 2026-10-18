export type IPostLoginBody = {
  email: string;
  password: string;
};

export type IPutResetPasswordBody = {
  email: string;
};

export type IGetSearchEmailParams = {
  email: string;
};

export type IGetSearchPhoneParams = {
  phone: string;
};

export type IPostSendPhoneValidationParams = {
  phone: string;
};

export type IGetCheckPinParams = {
  phone: string;
  code: string;
};

export type IPostCreateUserParams = {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  birthday: string;
  birthCountry: string;
  address: {
    str: string;
    city: string;
    zip: string;
    country: string;
  };
  phoneValidationCode: number;
  specifiedUSPerson: 0 | 1;
};
