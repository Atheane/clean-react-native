import { Logger } from '@clean-rn/logger';

import { IDocumentTypes, IDocumentActions } from '../../../commands/document';
import { IDocumentState } from '../../state/document';

const initialState: IDocumentState = {
  pending: false,
  document: null,
};

export const documentReducer = (state = initialState, action: IDocumentActions) => {
  const logger = Logger.getInstance();
  let newState: IDocumentState;
  switch (action.type) {
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
    case IDocumentTypes.INITIALIZE_DOCUMENT:
      logger.debug(action.type);
      newState = {
        ...state,
        pending: false,
        document: null,
      };
      return newState;
    default:
      return {
        ...state,
      };
  }
};
