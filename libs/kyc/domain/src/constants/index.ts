import { IDocumentCategory, IDocumentType } from '../types';

export const ALLOWED_DOCUMENT_TYPES = {
  [IDocumentCategory.W9]: [IDocumentType.TAX_CERTIFICATE],
  [IDocumentCategory.FIRST_ID]: [IDocumentType.ID, IDocumentType.PASSPORT, IDocumentType.RESIDENT_PERMIT],
  [IDocumentCategory.SECOND_ID]: [
    IDocumentType.ID,
    IDocumentType.PASSPORT,
    IDocumentType.RESIDENT_PERMIT,
    IDocumentType.DRIVING_LICENSE,
    IDocumentType.HEALTH_INSURANCE_CARD,
  ],
  [IDocumentCategory.RESIDENCE_PROOF]: [
    IDocumentType.INVOICE,
    IDocumentType.PROOF_OF_ADDRESS,
    IDocumentType.TAX_STATEMENT,
    IDocumentType.BANK_ID,
    IDocumentType.TAX_CERTIFICATE,
  ],
  [IDocumentCategory.PORTRAIT]: [IDocumentType.ID, IDocumentType.LIVENESS],
};
