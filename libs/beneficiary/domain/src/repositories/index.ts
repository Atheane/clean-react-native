import { IBeneficiary } from '../entities';

export interface IBeneficiaryRepository {
  getBeneficiary(): Promise<IBeneficiary[]>;
}
