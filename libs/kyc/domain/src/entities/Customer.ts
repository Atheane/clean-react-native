import { Entity } from '@clean-rn/ddd';
import { IDocumentProperties, IDocumentStatus, ICustomerStatus } from '../types';
import { KycDocuments, DocumentVO } from '../value-objects';
import { CustomerError } from '../errors/index';

export interface ICustomerProperties {
  // todo part of the actual user should be moved to customer entity
  USPerson: boolean;
  status: ICustomerStatus;
  kyc: KycDocuments;
  kycReviewComment?: string;
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

  addKycReviewComment(comment: string): void {
    this.properties.kycReviewComment = comment;
  }

  checkDocumentsStatus(docProps: IDocumentProperties[]): void {
    this.properties.kyc = new KycDocuments(docProps, this.properties.USPerson);
  }
}
