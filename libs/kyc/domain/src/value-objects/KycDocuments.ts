import { IDocumentCategory, IDocumentProperties } from '../types';
import { Document } from './Document';

export class KycDocuments {
  w9?: Document;
  firstId?: Document;
  secondId?: Document;
  residenceProof?: Document;
  portrait?: Document;

  constructor(docsProps: IDocumentProperties[]) {
    const documentsByCategory = this.allocateDocumentsByCategory(docsProps);
    if (documentsByCategory[IDocumentCategory.W9].length > 0) {
      this.w9 = new Document(IDocumentCategory.FIRST_ID, documentsByCategory[IDocumentCategory.FIRST_ID]);
    }
    if (documentsByCategory[IDocumentCategory.FIRST_ID].length > 0) {
      const firstId = new Document(
        IDocumentCategory.FIRST_ID,
        documentsByCategory[IDocumentCategory.FIRST_ID],
      );
      if (firstId.rectoProps) {
        this.firstId = firstId;
      }
    }
    if (documentsByCategory[IDocumentCategory.SECOND_ID].length > 0) {
      const secondId = new Document(
        IDocumentCategory.SECOND_ID,
        documentsByCategory[IDocumentCategory.SECOND_ID],
      );
      if (secondId.rectoProps) {
        this.secondId = secondId;
      }
    }
    if (documentsByCategory[IDocumentCategory.RESIDENCE_PROOF].length > 0) {
      const residenceProof = new Document(
        IDocumentCategory.RESIDENCE_PROOF,
        documentsByCategory[IDocumentCategory.RESIDENCE_PROOF],
      );
      if (residenceProof.rectoProps) {
        this.residenceProof = residenceProof;
      }
    }
    if (documentsByCategory[IDocumentCategory.PORTRAIT].length > 0) {
      const portrait = new Document(
        IDocumentCategory.PORTRAIT,
        documentsByCategory[IDocumentCategory.PORTRAIT],
      );
      if (portrait.rectoProps) {
        this.portrait = portrait;
      }
    }
  }

  private allocateDocumentsByCategory(docsProps: IDocumentProperties[]): {
    [key in IDocumentCategory]: IDocumentProperties[];
  } {
    if (docsProps.length === 0) {
      return {
        [IDocumentCategory.W9]: [],
        [IDocumentCategory.FIRST_ID]: [],
        [IDocumentCategory.SECOND_ID]: [],
        [IDocumentCategory.RESIDENCE_PROOF]: [],
        [IDocumentCategory.PORTRAIT]: [],
      };
    }
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
}
