import { IDomainError } from '@clean-rn/ddd';

import {
  IBeneficiary,
  IBeneficiaryErrorCodes,
  IBeneficiaryErrorMessage,
} from '@clean-rn/beneficiary/domain';

export interface IBeneficiaryState {
  pending: boolean;
  beneficiaries: IBeneficiary[] | null;
  tab: number;
  error: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage> | null;
}
