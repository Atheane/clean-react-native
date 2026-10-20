import { DocumentVO } from '../value-objects';
import { IDocumentCategory, IDocumentProperties, IDocumentStatus, IDocumentType } from '../types';
import { ALLOWED_DOCUMENT_TYPES } from '../constants';
import { DocumentError } from '../errors';
import { arrayIsEmpty } from '@clean-rn/shared/domain';

export class KycDocuments {
  documents: { [key in IDocumentCategory]: DocumentVO | undefined } = {
    [IDocumentCategory.W9]: undefined,
    [IDocumentCategory.FIRST_ID]: undefined,
    [IDocumentCategory.SECOND_ID]: undefined,
    [IDocumentCategory.RESIDENCE_PROOF]: undefined,
    [IDocumentCategory.SWORN_STATEMENT]: undefined,
    [IDocumentCategory.HOST_ID]: undefined,
  };
  private expectedDocumentCount: number;

  constructor(docsProps: IDocumentProperties[], USPerson?: boolean) {
    this.expectedDocumentCount = USPerson ? 4 : 3;
    const documentsByCategory = this.allocateDocumentsByCategory(docsProps);
    Object.keys(documentsByCategory).forEach((category) => {
      this.processCategoryDocuments(category as IDocumentCategory, documentsByCategory);
    });
  }

  addDocument(document: DocumentVO): void {
    this.validateDocumentType(document.properties.category, document.properties.typeId);
    this.documents[document.properties.category] = document;
  }

  get isComplete(): boolean {
    const requiredDocs = Object.values(this.documents).filter((doc) => doc !== undefined);
    return requiredDocs.length === this.expectedDocumentCount;
  }

  private processCategoryDocuments(
    category: IDocumentCategory,
    documentsByCategory: { [key in IDocumentCategory]: IDocumentProperties[] },
  ): void {
    if (!arrayIsEmpty(documentsByCategory[category])) {
      const relevantDocumentProperties = this.filterRelevantDocumentProperties(
        category,
        documentsByCategory[category],
      );
      if (!arrayIsEmpty(relevantDocumentProperties)) {
        const docStatus = this.checkDocumentStatus(relevantDocumentProperties);
        this.documents[category] = new DocumentVO({
          ...relevantDocumentProperties[0],
          status: docStatus,
        });
      }
    }
  }

  private validateDocumentType(category: IDocumentCategory, type: IDocumentType): void {
    if (!ALLOWED_DOCUMENT_TYPES[category].includes(type)) {
      throw new DocumentError.InvalidDocumentType(
        `${type} is not a valid document type for context ${category}`,
      );
    }
  }

  // this should be done in back-end
  private allocateDocumentsByCategory(docsProps: IDocumentProperties[]): {
    [key in IDocumentCategory]: IDocumentProperties[];
  } {
    // if several docs for one category, take last one
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

  private filterRelevantDocumentProperties(
    category: IDocumentCategory,
    docsProps: IDocumentProperties[],
  ): IDocumentProperties[] {
    const sortedDocuments = docsProps.sort((a, b) => {
      if (a.typeId === b.typeId) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.typeId < b.typeId ? -1 : 1;
    });
    const documentsByTypeId = sortedDocuments.reduce(
      (accumulator, doc) => {
        this.validateDocumentType(category, doc.typeId);
        if (!accumulator[doc.typeId]) {
          accumulator[doc.typeId] = [doc];
        } else if (accumulator[doc.typeId].length < DocumentVO.computeExpectedPagesNumber(doc.typeId)) {
          // here we keep the latest document properties up to the number of pages expected for each type
          accumulator[doc.typeId].push(doc);
        }
        return accumulator;
      },
      {} as { [key in IDocumentType]: IDocumentProperties[] },
    );
    // then we keep documents with typeID for which we have the expected number of pages
    const typeId = ALLOWED_DOCUMENT_TYPES[category].find(
      (typeId: IDocumentType) =>
        documentsByTypeId[typeId] &&
        documentsByTypeId[typeId].length === DocumentVO.computeExpectedPagesNumber(typeId),
    );
    if (!typeId) {
      return [];
    }
    return documentsByTypeId[typeId];
  }

  private checkDocumentStatus(docProps: IDocumentProperties[]) {
    if (docProps.some((doc: IDocumentProperties) => doc.status === IDocumentStatus.CANCELED)) {
      return IDocumentStatus.CANCELED; // user should be blocked anyway
    } else if (docProps.some((doc: IDocumentProperties) => doc.status === IDocumentStatus.REFUSED)) {
      return IDocumentStatus.REFUSED;
    } else if (docProps.every((doc: IDocumentProperties) => doc.status === IDocumentStatus.VALIDATED)) {
      return IDocumentStatus.VALIDATED;
    }
    return IDocumentStatus.PENDING;
  }
}
