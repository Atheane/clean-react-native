import { IDocumentTypes, IDocumentActions } from '../../../commands/document';
import { IDocumentState } from '../../state/document';

const initialState: IDocumentState = {
  pending: false,
  document: null,
  abortController: null,
};

export const documentReducer = (state = initialState, action: IDocumentActions) => {
  let newState: IDocumentState;
  switch (action.type) {
    case IDocumentTypes.INITIALIZE_DOCUMENT:
      return state;
    case IDocumentTypes.DOCUMENT_INITIALIZED:
      newState = {
        ...state,
        pending: false,
        document: action.payload.document,
      };
      return newState;
    case IDocumentTypes.ADD_PAGE:
      return state;
    case IDocumentTypes.CANCEL_UPLOAD:
      newState = {
        ...state,
        pending: false,
        document: null,
      };
      return newState;
    case IDocumentTypes.SET_ABORT_CONTROLLER:
      newState = {
        ...state,
        abortController: action.payload.controller,
      };
      return newState;
    case IDocumentTypes.PAGE_ADDED:
      newState = {
        ...state,
        pending: false,
        document: action.payload.document,
      };
      return newState;
    case IDocumentTypes.UPLOAD_DOCUMENT:
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IDocumentTypes.DOCUMENT_UPLOADED:
      newState = {
        ...state,
        pending: false,
        document: action.payload.document,
      };
      return newState;
    case IDocumentTypes.RESET_DOCUMENT:
      newState = {
        ...state,
        ...initialState,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
