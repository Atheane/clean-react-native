export interface IBeneficiary {
  accountId?: number; //if its os a CO2 account
  beneficiaryId: number;
  name: string;
  iban: string;
  bic: string;
}
