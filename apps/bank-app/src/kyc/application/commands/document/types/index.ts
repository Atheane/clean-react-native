import { DocumentVO } from '@clean-rn/kyc/domain';

export enum IDocumentTypes {
  UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT',
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
  INITIALIZE_DOCUMENT = 'INITIALIZE_DOCUMENT',
}

export type IUploadDocument = {
  type: typeof IDocumentTypes.UPLOAD_DOCUMENT;
  payload: {
    document: DocumentVO;
  };
};

export type IDocumentUploaded = {
  type: typeof IDocumentTypes.DOCUMENT_UPLOADED;
  payload: {
    document: DocumentVO;
  };
};

export type IInitializeDocument = {
  type: typeof IDocumentTypes.INITIALIZE_DOCUMENT;
};

export type IDocumentActions = IUploadDocument | IDocumentUploaded | IInitializeDocument;
