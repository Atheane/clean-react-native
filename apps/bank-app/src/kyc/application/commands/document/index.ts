import { DocumentVO, IDocumentProperties } from '@clean-rn/kyc/domain';
import {
  IDocumentTypes,
  IDocumentActions,
  IInitializeDocument,
  IAddPage,
  IUploadDocument,
  IDocumentInitialized,
  IPageAdded,
  IDocumentUploaded,
  IResetDocument,
  ICancelUpload,
  ISetAbortController,
} from './types';
import { ImageSourcePropType } from 'react-native';

// commands
export const initializeDocument = (payload: {
  documentProperties: IDocumentProperties;
}): IInitializeDocument => ({
  type: IDocumentTypes.INITIALIZE_DOCUMENT,
  payload,
});

export const addPage = (payload: {
  base64: string;
  nextRouteParams?: {
    instruction: string;
    imageSource: ImageSourcePropType;
    anotherInstruction?: string;
    docPickerVisible?: boolean;
    secondImageVisible?: boolean;
    showExample?: boolean;
  };
}): IAddPage => ({
  type: IDocumentTypes.ADD_PAGE,
  payload,
});
export const uploadDocument = (payload: { document: DocumentVO }): IUploadDocument => ({
  type: IDocumentTypes.UPLOAD_DOCUMENT,
  payload,
});

export const resetDocument = (): IResetDocument => ({
  type: IDocumentTypes.RESET_DOCUMENT,
});

export const cancelUpload = (): ICancelUpload => ({
  type: IDocumentTypes.CANCEL_UPLOAD,
});

export const setAbortController = (payload: { controller: AbortController }): ISetAbortController => ({
  type: IDocumentTypes.SET_ABORT_CONTROLLER,
  payload,
});

// domainEvents
export const documentInitialized = (payload: { document: DocumentVO }): IDocumentInitialized => ({
  type: IDocumentTypes.DOCUMENT_INITIALIZED,
  payload,
});

export const pageAdded = (payload: { document: DocumentVO }): IPageAdded => ({
  type: IDocumentTypes.PAGE_ADDED,
  payload,
});
export const documentUploaded = (payload: { document: DocumentVO }): IDocumentUploaded => ({
  type: IDocumentTypes.DOCUMENT_UPLOADED,
  payload,
});

export { IDocumentTypes, IDocumentActions };
