import { IStepTypes, IDocumentType } from '../types';

export const ALLOWED_DOCUMENT_TYPES = {
  [IStepTypes.W9]: [IDocumentType.TAX_CERTIFICATE],
  [IStepTypes.ID]: [IDocumentType.ID, IDocumentType.PASSPORT, IDocumentType.RESIDENT_PERMIT],
};

export const EXPECTED_STEPS_NUMBER = 3;
