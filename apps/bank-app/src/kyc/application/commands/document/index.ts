import { DocumentVO } from '@clean-rn/kyc/domain';
import {
  IDocumentTypes,
  IDocumentActions,
  IUploadDocument,
  IDocumentUploaded,
  IInitializeDocument,
} from './types';

// commands
export const uploadDocument = (payload: { document: DocumentVO }): IUploadDocument => ({
  type: IDocumentTypes.UPLOAD_DOCUMENT,
  payload,
});

export const initializeDocument = (): IInitializeDocument => ({
  type: IDocumentTypes.INITIALIZE_DOCUMENT,
});

// domainEvents
export const documentUploaded = (payload: { document: DocumentVO }): IDocumentUploaded => ({
  type: IDocumentTypes.DOCUMENT_UPLOADED,
  payload,
});

export { IDocumentTypes, IDocumentActions };
