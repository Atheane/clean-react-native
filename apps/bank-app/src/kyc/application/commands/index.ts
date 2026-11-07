import { User } from '@clean-rn/user/domain';
import { IDocumentProperties } from '@clean-rn/kyc/domain';
import { ImageSourcePropType } from 'react-native';
import {
  ICustomerTypes,
  ICheckCustomerStatus,
  ICustomerActions,
  IInitializeCustomer,
  IAddPage,
  ICreateDocument,
  ISendDocument,
} from './types';

// commands
export const checkCustomerStatus = (payload: { user: User }): ICheckCustomerStatus => ({
  type: ICustomerTypes.CHECK_CUSTOMER_STATUS,
  payload,
});

export const createDocument = (payload: { documentProperties: IDocumentProperties }): ICreateDocument => ({
  type: ICustomerTypes.CREATE_DOCUMENT,
  payload,
});

export const sendDocument = (): ISendDocument => ({
  type: ICustomerTypes.SEND_DOCUMENT,
});

export const addPage = (payload: {
  base64: string;
  nextRouteParams?: {
    instruction: string;
    imageSource: ImageSourcePropType;
    anotherInstruction?: string;
    docPickerVisible?: boolean;
    secondImageVisible?: boolean;
    showExample?: boolean;
  };
}): IAddPage => ({
  type: ICustomerTypes.ADD_PAGE,
  payload,
});

export const initializeCustomer = (): IInitializeCustomer => ({
  type: ICustomerTypes.INITIALIZE_CUSTOMER,
});

export { ICustomerTypes, ICustomerActions };
