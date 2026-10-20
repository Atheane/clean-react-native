import { DocumentVO } from '../value-objects';
import { IDocumentProperties } from '../types';

export interface IDocumentRepository {
  getDocuments(customerId: string): Promise<IDocumentProperties[]>;
  createDocument({
    customerId,
    document,
  }: {
    customerId: string;
    document: DocumentVO;
  }): Promise<IDocumentProperties[]>;
}
