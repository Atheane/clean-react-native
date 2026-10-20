import { Entity } from '@clean-rn/ddd';
import { IDocument, IDocumentStatus, ICustomerStatus, IKycDocuments } from '../types';

export interface ICustomerProperties {
  // todo part of the actual user should be moved to customer entity
  status: ICustomerStatus;
  documents: IKycDocuments;
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

  addDocuments(documents: IDocument[]): void {
    const sortedDocuments = documents.sort((a, b) => {
      if (a.category === b.category) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.category < b.category ? -1 : 1;
    });

    // for eachg category, only one document, the latest should be kept if several were possibly allocated
    this.properties.documents = sortedDocuments.reduce((accumulator, doc) => {
      if (!accumulator[doc.category]) {
        accumulator[doc.category] = doc;
      }
      return accumulator;
    }, {} as IKycDocuments);
  }

  checkCustomerStatus(): void {
    const documents = (this.properties.documents && Object.values(this.properties.documents)) ?? [];
    if (!documents || documents.length === 0) {
      return;
    }
    if (documents.some((doc: IDocument) => doc.status === IDocumentStatus.CANCELED)) {
      this.properties.status = 'CANCELED'; // user should be blocked anyway
    } else if (documents.some((doc: IDocument) => doc.status === IDocumentStatus.REFUSED)) {
      this.properties.status = 'REFUSED';
    } else if (documents.every((doc: IDocument) => doc.status === IDocumentStatus.VALIDATED)) {
      this.properties.status = 'VALIDATED';
    } else {
      this.properties.status = 'PENDING';
    }
  }
}
