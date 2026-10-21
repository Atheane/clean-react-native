import { IBeneficiary } from '@clean-rn/beneficiary/domain';

export enum IBeneficiaryTypes {
  LIST_BENEFICIARY = 'LIST_BENEFICIARY',
  BENEFICIARY_LISTED = 'BENEFICIARY_LISTED',
  INITIALIZE_BENEFICIARY_LIST = 'INITIALIZE_BENEFICIARY_LIST',
}

export type IListBeneficiary = {
  type: typeof IBeneficiaryTypes.LIST_BENEFICIARY;
};

export type IBeneficiaryListed = {
  type: typeof IBeneficiaryTypes.BENEFICIARY_LISTED;
  payload: IBeneficiary[];
};

export type IInitializeBeneficiaryList = {
  type: typeof IBeneficiaryTypes.INITIALIZE_BENEFICIARY_LIST;
};

export type IBeneficiaryActions = IListBeneficiary | IBeneficiaryListed | IInitializeBeneficiaryList;
