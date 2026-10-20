import { Entity } from '@clean-rn/ddd';
import { IDocumentProperties, IDocumentStatus, ICustomerStatus } from '../types';
import { KycDocuments } from '../value-objects/KycDocuments';

export interface ICustomerProperties {
  // todo part of the actual user should be moved to customer entity
  status: ICustomerStatus;
  documents: KycDocuments;
}

export class Customer extends Entity<ICustomerProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<ICustomerProperties> }) {
    super({ id, properties });
  }

  static Create({
    id,
    properties: { status },
  }: {
    id: number;
    properties: {
      status: ICustomerStatus;
    };
  }): Customer {
    return new Customer({
      id: id.toString(),
      properties: { status },
    });
  }

  addDocuments(documents: IDocumentProperties[]): void {
    this.properties.documents = new KycDocuments(documents);
  }

  checkCustomerStatus(): void {
    const documents = (this.properties.documents && Object.values(this.properties.documents)) ?? [];
    if (!documents || documents.length === 0) {
      return;
    }
    if (documents.some((doc: IDocumentProperties) => doc.status === IDocumentStatus.CANCELED)) {
      this.properties.status = 'CANCELED'; // user should be blocked anyway
    } else if (documents.some((doc: IDocumentProperties) => doc.status === IDocumentStatus.REFUSED)) {
      this.properties.status = 'REFUSED';
    } else if (documents.every((doc: IDocumentProperties) => doc.status === IDocumentStatus.VALIDATED)) {
      this.properties.status = 'VALIDATED';
    } else {
      this.properties.status = 'PENDING';
    }
  }
}
