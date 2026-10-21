import { IBeneficiary } from '@clean-rn/beneficiary/domain';
import {
  IBeneficiaryTypes,
  IBeneficiaryList,
  IBeneficiaryListDone,
  IBeneficiaryListInit,
  IBeneficiaryActions,
} from './types';

// commands
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
