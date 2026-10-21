import { IDocumentCategory, IDocumentType } from '../types';

export const ALLOWED_DOCUMENT_TYPES = {
  [IDocumentCategory.W9]: [IDocumentType.TAX_CERTIFICATE],
  [IDocumentCategory.ID]: [IDocumentType.ID, IDocumentType.PASSPORT, IDocumentType.RESIDENT_PERMIT],
  [IDocumentCategory.RESIDENCE_PROOF]: [
    IDocumentType.INVOICE,
    IDocumentType.PROOF_OF_ADDRESS,
    IDocumentType.TAX_STATEMENT,
    IDocumentType.TAX_CERTIFICATE,
  ],
  [IDocumentCategory.RESIDENCE_PROOF_ID]: [
    IDocumentType.ID,
    IDocumentType.PASSPORT,
    IDocumentType.SWORN_STATEMENT,
  ],
  [IDocumentCategory.RESIDENCE_PROOF_SWORN_STATEMENT]: [IDocumentType.SWORN_STATEMENT],
};

export const EXPECTED_DOCUMENTS_NUMBER = 2;
