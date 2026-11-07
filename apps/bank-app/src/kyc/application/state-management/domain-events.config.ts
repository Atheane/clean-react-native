import { KYC_EVENTS } from '@clean-rn/kyc/domain';
import { ICustomerTypes } from '../commands';

export const kycDomainEventsConfig = {
  customer: [
    {
      eventName: KYC_EVENTS.CUSTOMER_CREATED,
      actionType: ICustomerTypes.KYC_DOMAIN_EVENT,
    },
    {
      eventName: KYC_EVENTS.KYC_STATUS_CHECKED,
      actionType: ICustomerTypes.KYC_DOMAIN_EVENT,
    },
    {
      eventName: KYC_EVENTS.REVENUES_CHECKED,
      actionType: ICustomerTypes.KYC_DOMAIN_EVENT,
    },
    {
      eventName: KYC_EVENTS.SCT_CHECKED,
      actionType: ICustomerTypes.KYC_DOMAIN_EVENT,
    },
    {
      eventName: KYC_EVENTS.ID_CHECKED,
      actionType: ICustomerTypes.KYC_DOMAIN_EVENT,
    },
    {
      eventName: KYC_EVENTS.W9_CHECKED,
      actionType: ICustomerTypes.KYC_DOMAIN_EVENT,
    },
    {
      eventName: KYC_EVENTS.DOCUMENT_CREATED,
      actionType: ICustomerTypes.KYC_DOMAIN_EVENT,
    },
    {
      eventName: KYC_EVENTS.DOCUMENT_PAGE_ADDED,
      actionType: ICustomerTypes.KYC_DOMAIN_EVENT,
    },
    {
      eventName: KYC_EVENTS.DOCUMENT_SENT,
      actionType: ICustomerTypes.KYC_DOMAIN_EVENT,
    },
  ],
};
