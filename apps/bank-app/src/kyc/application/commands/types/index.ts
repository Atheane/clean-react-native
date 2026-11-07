import { ImageSourcePropType } from 'react-native';
import { User } from '@clean-rn/user/domain';
import { Customer, IDocumentProperties } from '@clean-rn/kyc/domain';

export enum ICustomerTypes {
  INITIALIZE_CUSTOMER = 'INITIALIZE_CUSTOMER',
  CHECK_CUSTOMER_STATUS = 'CHECK_CUSTOMER_STATUS',
  CREATE_DOCUMENT = 'CREATE_DOCUMENT',
  ADD_PAGE = 'ADD_PAGE',
  SEND_DOCUMENT = 'SEND_DOCUMENT',
  KYC_DOMAIN_EVENT = 'KYC_DOMAIN_EVENT',
}

export type IInitializeCustomer = {
  type: typeof ICustomerTypes.INITIALIZE_CUSTOMER;
};

export type ICheckCustomerStatus = {
  type: typeof ICustomerTypes.CHECK_CUSTOMER_STATUS;
  payload: {
    user: User;
  };
};

export type ICreateDocument = {
  type: typeof ICustomerTypes.CREATE_DOCUMENT;
  payload: {
    documentProperties: IDocumentProperties;
  };
};

export type IAddPage = {
  type: typeof ICustomerTypes.ADD_PAGE;
  payload: {
    base64: string;
    nextRouteParams?: {
      instruction: string;
      imageSource: ImageSourcePropType;
      anotherInstruction?: string;
      docPickerVisible?: boolean;
      secondImageVisible?: boolean;
      showExample?: boolean;
    };
  };
};

export type ISendDocument = {
  type: typeof ICustomerTypes.SEND_DOCUMENT;
};

export type IKycDomainEvent = {
  type: typeof ICustomerTypes.KYC_DOMAIN_EVENT;
  payload: {
    customer: Customer;
  };
};

export type ICustomerActions =
  | IInitializeCustomer
  | ICheckCustomerStatus
  | ICreateDocument
  | IAddPage
  | ISendDocument
  | IKycDomainEvent;
