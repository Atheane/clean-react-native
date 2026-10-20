export enum DOCUMENT_TYPE {
  RECORD = 2, // Police record
  COMPANY_REGISTRATION = 4, // Company Registration
  CV = 6, // CV
  SWORN_STATEMENT = 7, // Sworn statement
  TURNOVER = 8, // Turnover
  ID = 9, // Identity card
  BANK_ID = 11, // Bank Identity Statement
  PROOF_OF_ADRESS = 12, // Proof of address
  MOBILE_PHONE_INVOICE = 13, // Mobile phone invoice
  INVOICE = 14, // Invoice, other than Mobile phone invoice
  RESIDENT_PERMIT = 15, // A residence permit
  DRIVING_LICENSE = 16, // A driving licence
  PASSPORT = 17, // A passport
  PROXY_GRANT = 18, // A proxy granting an employee
  COMPANY_REGISTRATION_OFFICIAL = 19, // A company registration official paper
  TAX_CERTIFICATE = 20, // Official tax certificate
  EMPLOYEE_PAYMENT = 21, // Employee payment notice
  BANK_STATEMENT = 22, // User bank statement
  BUSINESS_LEGAL_STATUS = 23, // Business legal status
  TAX_STATEMENT = 24, // Tax Statement
  TAX_EXEMPTION = 25, // Exemption Statement
  LIVENESS = 26, // Liveness result
  HEALTH_INSURANCE_CARD = 27, // Health insurance card
  SIREN = 28, // SIREN
  RBE = 29, // RBE (Registered Beneficiare Effectif)
  PEP = 31, // PEP - Assets Declaration
  PRD = 32, // Professional - Revenue Declaration
  NPO = 33, // Non-Profit Organisation - Financial Declaration
}

export enum DOCUMENT_STATUS {
  CANCELED = 'CANCELED', // document is canceled before analysis
  PENDING = 'PENDING', // document has pending status
  VALIDATED = 'VALIDATED', // document is validated
  REFUSED = 'REFUSED', // document is refused
}

export enum DOCUMENT_STATUS_CODE {
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

export type IDocument = {
  typeId: DOCUMENT_TYPE;
  status: DOCUMENT_STATUS;
  statusCode?: DOCUMENT_STATUS_CODE;
  name: string;
};

export type CUSTOMER_STATUS = 'INIT' | 'VALIDATED' | 'PENDING' | 'REFUSED' | 'CANCELED';
