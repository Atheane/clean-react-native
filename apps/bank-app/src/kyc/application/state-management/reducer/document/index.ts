import { Logger } from '@clean-rn/logger';

import { IDocumentTypes, IDocumentActions } from '../../../commands/document';
import { IDocumentState } from '../../state/document';

const initialState: IDocumentState = {
  pending: false,
  document: null,
  abortController: null,
};

export const documentReducer = (state = initialState, action: IDocumentActions) => {
  const logger = Logger.getInstance();
  let newState: IDocumentState;
  switch (action.type) {
    case IDocumentTypes.INITIALIZE_DOCUMENT:
      logger.debug(action.type);
      return state;
    case IDocumentTypes.DOCUMENT_INITIALIZED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        document: action.payload.document,
      };
      return newState;
    case IDocumentTypes.ADD_PAGE:
      logger.debug(action.type);
      return state;
    case IDocumentTypes.RESET_DOCUMENT:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        document: null,
      };
      return newState;
    case IDocumentTypes.CANCEL_UPLOAD:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        document: null,
      };
      return newState;
    case IDocumentTypes.SET_ABORT_CONTROLLER:
      logger.debug(action.type);
      newState = {
        ...state,
        abortController: action.payload.controller,
      };
      return newState;
    case IDocumentTypes.PAGE_ADDED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        document: action.payload.document,
      };
      return newState;
    case IDocumentTypes.UPLOAD_DOCUMENT:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: true,
      };
      return newState;
    case IDocumentTypes.DOCUMENT_UPLOADED:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        document: action.payload.document,
      };
      return newState;

    default:
      return {
        ...state,
      };
  }
};
