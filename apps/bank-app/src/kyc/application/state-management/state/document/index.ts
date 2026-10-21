import { DocumentVO } from '@clean-rn/kyc/domain';

export interface IDocumentState {
  pending: boolean;
  document: DocumentVO | null;
  abortController: AbortController | null;
}
