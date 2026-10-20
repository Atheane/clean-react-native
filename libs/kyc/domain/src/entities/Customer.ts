import { Entity } from '@clean-rn/ddd';
import { IDocument } from '../types';

export interface ICustomerProperties {
  // identity: IIdentity;
  // birth: IBirth;
  // address: IAddress;
  // USPerson: boolean;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  documents: IDocument[];
}

export class Customer extends Entity<ICustomerProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<ICustomerProperties> }) {
    super({ id, properties });
  }

  static Create({ properties: { documents } }: { properties: { documents: IDocument[] } }): Customer {
    return new Customer({ properties: { documents, status: 'PENDING' } });
  }

  checkCustomerStatus(): void {
    const { documents } = this.properties;
    if (!documents) {
      return; // it cannot happen: an instance of Customer will always have documents initialized at []
    }
    if (documents.length === 0) {
      this.properties.status = 'PENDING';
    } else if (documents.some((doc) => doc.statusCode === 'REJECTED')) {
      this.properties.status = 'REJECTED';
    } else if (documents.every((doc) => doc.statusCode === 'APPROVED')) {
      this.properties.status = 'APPROVED';
    } else {
      this.properties.status = 'PENDING';
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
