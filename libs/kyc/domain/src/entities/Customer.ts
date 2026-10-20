import { Entity } from '@clean-rn/ddd';
import { IDocumentProperties, IDocumentStatus, ICustomerStatus } from '../types';
import { KycDocuments, DocumentVO } from '../value-objects';
import { CustomerError } from '../errors/index';

export interface ICustomerProperties {
  // todo part of the actual user should be moved to customer entity
  USPerson: boolean;
  status: ICustomerStatus;
  kyc: KycDocuments;
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

  addKyc(kyc: KycDocuments): void {
    this.properties.kyc = kyc;
  }

  addDocument(document: DocumentVO): void {
    if (!this.properties.kyc) {
      throw new CustomerError.MissingKycDocuments('addKyc first');
    }
    this.properties.kyc.addDocument(document);
  }

  checkDocumentsStatus(docProps: IDocumentProperties[]): void {
    this.properties.kyc = new KycDocuments(docProps, this.properties.USPerson);
  }

  checkCustomerStatus(): void {
    const documents =
      (this.properties.kyc?.documents &&
        Object.values(this.properties.kyc.documents).filter(
          (doc: DocumentVO | undefined) => doc !== undefined,
        )) ??
      [];
    if (!documents || documents.length === 0) {
      return;
    }
    if (
      documents.some((doc: DocumentVO | undefined) => doc?.properties.status === IDocumentStatus.CANCELED)
    ) {
      this.properties.status = 'CANCELED'; // user should be blocked anyway
    } else if (
      documents.some((doc: DocumentVO | undefined) => doc?.properties.status === IDocumentStatus.REFUSED)
    ) {
      this.properties.status = 'REFUSED';
    } else if (
      this.properties.kyc?.isComplete &&
      documents.every((doc: DocumentVO | undefined) => doc?.properties.status === IDocumentStatus.VALIDATED)
    ) {
      this.properties.status = 'VALIDATED';
    }
  }
}
