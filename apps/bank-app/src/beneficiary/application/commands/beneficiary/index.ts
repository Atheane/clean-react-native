import { IBeneficiary, IBeneficiaryAddCommand } from '@clean-rn/beneficiary/domain';
import {
  IBeneficiaryTypes,
  IBeneficiaryAdd,
  IBeneficiaryList,
  IBeneficiaryListDone,
  IBeneficiaryListInit,
  IBeneficiaryActions,
} from './types';

// commands
export const beneficiaryAdd = (payload: IBeneficiaryAddCommand): IBeneficiaryAdd => ({
  type: IBeneficiaryTypes.BENEFICIARY_ADD,
  payload,
});

export const beneficiaryList = (): IBeneficiaryList => ({
  type: IBeneficiaryTypes.BENEFICIARY_LIST,
});

export const beneficiaryListInit = (): IBeneficiaryListInit => ({
  type: IBeneficiaryTypes.BENEFICIARY_LIST_INIT,
});

// domainEvents
export const beneficiaryListed = (payload: IBeneficiary[]): IBeneficiaryListDone => ({
  type: IBeneficiaryTypes.BENEFICIARY_LIST_DONE,
  payload,
});

export { IBeneficiaryTypes, IBeneficiaryActions };
