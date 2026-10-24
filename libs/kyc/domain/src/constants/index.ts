import { IDocumentCategory, IDocumentType } from '../types';

export const ALLOWED_DOCUMENT_TYPES = {
  [IDocumentCategory.W9]: [IDocumentType.TAX_CERTIFICATE],
  [IDocumentCategory.ID]: [IDocumentType.ID, IDocumentType.PASSPORT, IDocumentType.RESIDENT_PERMIT],
};

export const EXPECTED_DOCUMENTS_NUMBER = 1;
