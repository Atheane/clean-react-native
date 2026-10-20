import { Entity } from '@clean-rn/ddd';
import { IDocumentProperties, IDocumentStatus, ICustomerStatus, IDocumentCategory } from '../types';
import { KycDocuments, Document } from '../value-objects';

export interface ICustomerProperties {
  // todo part of the actual user should be moved to customer entity
  USPerson: boolean;
  status: ICustomerStatus;
  documents: KycDocuments;
}

export class Customer extends Entity<ICustomerProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<ICustomerProperties> }) {
    super({ id, properties });
  }

  static Create({
    id,
    properties: { status, USPerson },
  }: {
    id: number;
    properties: {
      status?: ICustomerStatus;
      USPerson: boolean;
    };
  }): Customer {
    return new Customer({
      id: id.toString(),
      properties: status ? { status, USPerson } : { status: 'PENDING', USPerson },
    });
  }

  addDocument(document: Document): void {
    if (this.properties.documents) {
      switch (document?.rectoProps?.category) {
        case IDocumentCategory.W9:
          this.properties.documents.w9 = document;
          break;
        case IDocumentCategory.FIRST_ID:
          this.properties.documents.firstId = document;
          break;
        case IDocumentCategory.SECOND_ID:
          this.properties.documents.secondId = document;
          break;
        case IDocumentCategory.RESIDENCE_PROOF:
          this.properties.documents.residenceProof = document;
          break;
      }
    }
  }

  checkDocumentsStatus(docProps: IDocumentProperties[]): void {
    this.properties.documents = new KycDocuments(docProps, this.properties.USPerson);
  }

  checkCustomerStatus(): void {
    const documents = (this.properties.documents && Object.values(this.properties.documents)) ?? [];
    if (!documents || documents.length === 0) {
      return;
    }
    if (documents.some((doc: Document) => doc.status === IDocumentStatus.CANCELED)) {
      this.properties.status = 'CANCELED'; // user should be blocked anyway
    } else if (documents.some((doc: IDocumentProperties) => doc.status === IDocumentStatus.REFUSED)) {
      this.properties.status = 'REFUSED';
    } else if (
      this.properties.documents?.isComplete &&
      documents.every((doc: IDocumentProperties) => doc.status === IDocumentStatus.VALIDATED)
    ) {
      this.properties.status = 'VALIDATED';
    }
  }
}
