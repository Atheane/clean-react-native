import { IDocumentCategory, IDocumentProperties } from '../types';
import { Document } from './Document';

export class KycDocuments {
  w9?: Document;
  firstId?: Document;
  secondId?: Document;
  residenceProof?: Document;
  private expectedDocumentsNumber: number;

  constructor(docsProps: IDocumentProperties[], USPerson?: boolean) {
    if (USPerson) {
      this.expectedDocumentsNumber = 4;
    } else {
      this.expectedDocumentsNumber = 3;
    }
    const documentsByCategory = this.allocateDocumentsByCategory(docsProps);
    if (documentsByCategory[IDocumentCategory.W9] && documentsByCategory[IDocumentCategory.W9].length > 0) {
      this.w9 = new Document(IDocumentCategory.W9, documentsByCategory[IDocumentCategory.W9]);
    }
    if (
      documentsByCategory[IDocumentCategory.FIRST_ID] &&
      documentsByCategory[IDocumentCategory.FIRST_ID].length > 0
    ) {
      const firstId = new Document(
        IDocumentCategory.FIRST_ID,
        documentsByCategory[IDocumentCategory.FIRST_ID],
      );
      if (firstId.rectoProps) {
        this.firstId = firstId;
      }
    }
    if (
      documentsByCategory[IDocumentCategory.SECOND_ID] &&
      documentsByCategory[IDocumentCategory.SECOND_ID].length > 0
    ) {
      const secondId = new Document(
        IDocumentCategory.SECOND_ID,
        documentsByCategory[IDocumentCategory.SECOND_ID],
      );
      if (secondId.rectoProps) {
        this.secondId = secondId;
      }
    }
    if (
      documentsByCategory[IDocumentCategory.RESIDENCE_PROOF] &&
      documentsByCategory[IDocumentCategory.RESIDENCE_PROOF].length > 0
    ) {
      const residenceProof = new Document(
        IDocumentCategory.RESIDENCE_PROOF,
        documentsByCategory[IDocumentCategory.RESIDENCE_PROOF],
      );
      if (residenceProof.rectoProps) {
        this.residenceProof = residenceProof;
      }
    }
  }

  private allocateDocumentsByCategory(docsProps: IDocumentProperties[]): {
    [key in IDocumentCategory]: IDocumentProperties[];
  } {
    const sortedDocuments = docsProps.sort((a, b) => {
      if (a.category === b.category) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.category < b.category ? -1 : 1;
    });
    const documentsByCategory = sortedDocuments.reduce(
      (accumulator, doc) => {
        if (!accumulator[doc.category]) {
          accumulator[doc.category] = [doc];
        } else {
          accumulator[doc.category].push(doc);
        }
        return accumulator;
      },
      {} as { [key in IDocumentCategory]: IDocumentProperties[] },
    );
    return documentsByCategory;
  }

  get isComplete(): boolean {
    if (
      (this.expectedDocumentsNumber === 3 && this.firstId && this.secondId && this.residenceProof) ||
      (this.expectedDocumentsNumber === 4 && this.w9 && this.firstId && this.secondId && this.residenceProof)
    ) {
      return true;
    }
    return false;
  }
}
