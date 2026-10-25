import { IKycSteps, IDocumentType } from '../types';

export const ALLOWED_DOCUMENT_TYPES = {
  [IKycSteps.W9]: [IDocumentType.TAX_CERTIFICATE],
  [IKycSteps.ID]: [IDocumentType.ID, IDocumentType.PASSPORT, IDocumentType.RESIDENT_PERMIT],
};

export const EXPECTED_STEPS_NUMBER = 2;
