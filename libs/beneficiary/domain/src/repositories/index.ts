import { IBeneficiary } from '../entities';

export interface IBeneficiaryRepository {
  getBeneficiary(): Promise<IBeneficiary[]>;
  addBeneficiary(beneficiary: IBeneficiary): Promise<IBeneficiary>;
  deleteBeneficiary(beneficiary: IBeneficiary): Promise<IBeneficiary>;
}
