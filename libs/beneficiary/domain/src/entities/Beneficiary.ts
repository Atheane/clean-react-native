export interface IBeneficiary {
  accountId?: number; //if its os a CO2 account
  isActive: boolean;
  beneficiaryId: number;
  name: string;
  iban: string;
  bic: string;
}
