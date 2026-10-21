import { Entity } from '@clean-rn/ddd';
import { KYC_REVIEW } from '@clean-rn/user/domain';
import { IDocumentProperties } from '../types';
import { KycDocuments, DocumentVO } from '../value-objects';
import { CustomerError } from '../errors/index';

export interface ICustomerProperties {
  // todo part of the actual user should be moved to customer entity
  USPerson: boolean;
  status: KYC_REVIEW;
  kyc: KycDocuments;
  kycReviewComment?: string;
}

export class Customer extends Entity<ICustomerProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<ICustomerProperties> }) {
    super({ id, properties });
  }

  static Create({
    id,
    properties: { status, USPerson, kycReviewComment },
  }: {
    id: number;
    properties: {
      status?: KYC_REVIEW;
      USPerson: boolean;
      kycReviewComment?: string;
    };
  }): Customer {
    return new Customer({
      id: id.toString(),
      properties: status
        ? { status, USPerson, kycReviewComment }
        : { status: KYC_REVIEW.NONE, USPerson, kycReviewComment },
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
