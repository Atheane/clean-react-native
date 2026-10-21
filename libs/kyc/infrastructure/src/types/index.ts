export enum DOCUMENT_CONTEXT {
  W9 = 'W9',
  FIRST_ID = 'FIRST_ID',
  SECOND_ID = 'SECOND_ID',
  RESIDENCE_PROOF = 'RESIDENCE_PROOF',
  RESIDENCE_PROOF_FIRST_ID = 'RESIDENCE_PROOF_FIRST_ID',
  RESIDENCE_PROOF_SWORN_STATEMENT = 'RESIDENCE_PROOF_SWORN_STATEMENT',
}

export type IDocumentServer = {
  documentTypeId: string;
  documentStatus: string;
  documentStatusCode: string;
  documentContext: DOCUMENT_CONTEXT;
  name: string;
  createdAt: string;
};
