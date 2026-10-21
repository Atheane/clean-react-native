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

export enum IDocumentStatusCode {
  INITIAL = 600001, // - Initial status before upload into the container-  PENDING
  UPLOADED = 600003, // - Successfully uploaded into the container - PENDING
  SUSPECTED = 600002, // - Suspected fraud or AML/CFT - PENDING
  CANDELLED_USER = 600004, // - Cancelled by the user - CANCELED
  CANDELLED_OPERATOR = 600005, // - Cancelled by the operator - CANCELED
  FAILED_WRITE = 600006, // - Failed to write the document into the container - CANCELED
  FAILED_READ = 600007, // - Failed to read the document from the container - CANCELED
  VALIDATED = 600009, // - Validated - VALIDATED
  REFUSED = 600008, // - Refused - REFUSED
  OUT_OF_SCOPE = 600010, // - Out of scope - REFUSED
  EXPIRED = 600011, // - Expired - REFUSED
  FALSIFIED = 600012, // - Falsified - REFUSED
  ILLEGIBLE = 600013, // - Illegible - REFUSED
  TRUNCATED_DOC = 600014, // - Truncated document - REFUSED
  TRUNCATED = 600015, // - Truncated - REFUSED
  INCOHERENT = 600016, // - Incoherent - REFUSED
  OTHER = 600017, // - Other - REFUSED
}

export enum IDocumentCategory {
  W9 = 'W9',
  ID = 'ID',
  RESIDENCE_PROOF = 'RESIDENCE_PROOF',
  RESIDENCE_PROOF_ID = 'RESIDENCE_PROOF_ID',
  RESIDENCE_PROOF_SWORN_STATEMENT = 'RESIDENCE_PROOF_SWORN_STATEMENT',
}

export type IDocumentProperties = {
  category: IDocumentCategory;
  typeId: IDocumentType;
  status: IDocumentStatus;
  statusCode: IDocumentStatusCode;
  name: string;
  createdAt: Date;
};

export type ICustomerStatus = 'VALIDATED' | 'PENDING';

export type IDocumentPage = 'recto' | 'verso';
