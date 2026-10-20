import { IDocument } from '../types';

export interface IDocumentRepository {
  getDocuments(customerId: string): Promise<IDocument[]>;
}
