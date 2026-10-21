export enum IDocumentType {
  SWORN_STATEMENT = 7, // Sworn statement
  ID = 9, // Identity card
  BANK_ID = 11, // Bank Identity Statement
  PROOF_OF_ADDRESS = 12, // Proof of address
  INVOICE = 14, // Invoice, other than Mobile phone invoice
  RESIDENT_PERMIT = 15, // A residence permit
  DRIVING_LICENSE = 16, // A driving licence
  PASSPORT = 17, // A passport
  TAX_CERTIFICATE = 20, // Official tax certificate
  TAX_STATEMENT = 24, // Tax Statement, careful KycProvider ask for a residenceId for it, we do not know what it is, prefere TAX_CERTIFICATE instead
  LIVENESS = 26, // Liveness result
  HEALTH_INSURANCE_CARD = 27, // Health insurance card
}

export enum IDocumentStatus {
  INIT = 'INIT', // document template is created, but is not uploaded yet for review
  CANCELED = 'CANCELED', // document is canceled before analysis
  PENDING = 'PENDING', // document has pending status
  VALIDATED = 'VALIDATED', // document is validated
  REFUSED = 'REFUSED', // document is refused
}

export enum IDocumentCategory {
  W9 = 'W9',
  FIRST_ID = 'FIRST_ID',
  SECOND_ID = 'SECOND_ID',
  RESIDENCE_PROOF = 'RESIDENCE_PROOF',
  RESIDENCE_PROOF_FIRST_ID = 'RESIDENCE_PROOF_FIRST_ID',
  RESIDENCE_PROOF_SWORN_STATEMENT = 'RESIDENCE_PROOF_SWORN_STATEMENT',
}

export type IDocumentProperties = {
  category: IDocumentCategory;
  typeId: IDocumentType;
  status: IDocumentStatus;
  name: string;
  createdAt: Date;
};

export type ICustomerStatus = 'VALIDATED' | 'PENDING' | 'REFUSED' | 'CANCELED';

export type IDocumentPage = 'recto' | 'verso';
