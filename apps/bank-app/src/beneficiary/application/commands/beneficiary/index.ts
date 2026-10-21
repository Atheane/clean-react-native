import { IBeneficiary } from '@clean-rn/beneficiary/domain';
import {
  IBeneficiaryTypes,
  IListBeneficiary,
  IBeneficiaryListed,
  IInitializeBeneficiaryList,
  IBeneficiaryActions,
} from './types';

// commands
export const listBeneficiary = (): IListBeneficiary => ({
  type: IBeneficiaryTypes.LIST_BENEFICIARY,
});

export const initializeBeneficiaryList = (): IInitializeBeneficiaryList => ({
  type: IBeneficiaryTypes.INITIALIZE_BENEFICIARY_LIST,
});

// domainEvents
export const beneficiaryListed = (payload: IBeneficiary[]): IBeneficiaryListed => ({
  type: IBeneficiaryTypes.BENEFICIARY_LISTED,
  payload,
});

export { IBeneficiaryTypes, IBeneficiaryActions };
