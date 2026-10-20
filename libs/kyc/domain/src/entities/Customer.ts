import { Entity } from '@clean-rn/ddd';
import { IDocument, DOCUMENT_STATUS } from '../types';

export interface ICustomerProperties {
  // todo part of the actual user should be moved to customer entity
  // identity: IIdentity;
  // birth: IBirth;
  // address: IAddress;
  // USPerson: boolean;
  status: 'VALIDATED' | 'PENDING' | 'REFUSED' | 'CANCELED';
  documents: IDocument[];
}

export class Customer extends Entity<ICustomerProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<ICustomerProperties> }) {
    super({ id, properties });
  }

  static Create({
    id,
    properties: { documents, status },
  }: {
    id: number;
    properties: { documents?: IDocument[]; status?: 'VALIDATED' | 'PENDING' | 'REFUSED' | 'CANCELED' };
  }): Customer {
    return new Customer({
      id: id.toString(),
      properties: { documents: documents ?? [], status: status ?? 'PENDING' },
    });
  }

  checkCustomerStatus(): void {
    const { documents } = this.properties;
    if (!documents || documents.length === 0) {
      return;
    }
    if (documents.some((doc: IDocument) => doc.status === DOCUMENT_STATUS.REFUSED)) {
      this.properties.status = 'REFUSED';
    }
    if (documents.some((doc: IDocument) => doc.status === DOCUMENT_STATUS.CANCELED)) {
      this.properties.status = 'CANCELED';
    }
    if (documents.every((doc: IDocument) => doc.status === DOCUMENT_STATUS.VALIDATED)) {
      this.properties.status = 'VALIDATED';
    }
  }

  addDocument(document: IDocument): void {
    if (!this.properties.documents) {
      this.properties.documents = [];
    }
    this.properties.documents.push(document);
  }

  removeDocument(document: IDocument): void {
    if (!this.properties.documents) {
      throw new Error('Customer has no documents'); // todo domainError
    }
    this.properties.documents = this.properties.documents.filter((doc) => doc.name !== document.name);
  }
}
