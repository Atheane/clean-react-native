import { DocumentVO, IDocumentProperties } from '@clean-rn/kyc/domain';
import { ImageSourcePropType } from 'react-native';

export enum IDocumentTypes {
  INITIALIZE_DOCUMENT = 'INITIALIZE_DOCUMENT',
  DOCUMENT_INITIALIZED = 'DOCUMENT_INITIALIZED',
  ADD_PAGE = 'ADD_PAGE',
  PAGE_ADDED = 'PAGE_ADDED',
  UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT',
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
  CANCEL_UPLOAD = 'CANCEL_UPLOAD',
  RESET_DOCUMENT = 'RESET_DOCUMENT',
}

export type IInitializeDocument = {
  type: typeof IDocumentTypes.INITIALIZE_DOCUMENT;
  payload: {
    documentProperties: IDocumentProperties;
  };
};

export type IAddPage = {
  type: typeof IDocumentTypes.ADD_PAGE;
  payload: {
    base64: string;
    nextRouteParams?: {
      instruction: string;
      imageSource: ImageSourcePropType;
      anotherInstruction?: string;
      docPickerVisible?: boolean;
      secondImageVisible?: boolean;
      showExample?: boolean;
    };
  };
};

export type IUploadDocument = {
  type: typeof IDocumentTypes.UPLOAD_DOCUMENT;
  payload: {
    document: DocumentVO;
  };
};

export type IResetDocument = {
  type: typeof IDocumentTypes.RESET_DOCUMENT;
};

export type ICancelUpload = {
  type: typeof IDocumentTypes.CANCEL_UPLOAD;
};

export type IDocumentInitialized = {
  type: typeof IDocumentTypes.DOCUMENT_INITIALIZED;
  payload: {
    document: DocumentVO;
  };
};

export type IPageAdded = {
  type: typeof IDocumentTypes.PAGE_ADDED;
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

export type IDocumentActions =
  | IInitializeDocument
  | IAddPage
  | IUploadDocument
  | ICancelUpload
  | IResetDocument
  | IDocumentInitialized
  | IPageAdded
  | IDocumentUploaded;
