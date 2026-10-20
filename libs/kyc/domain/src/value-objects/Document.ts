import { IDocumentPage, IDocumentType, IDocumentProperties, IDocumentCategory } from '../types';
import { ALLOWED_DOCUMENT_TYPES } from '../constants';
import { CustomerError } from '../errors';

export class Document {
  category: IDocumentCategory;
  recto?: string;
  verso?: string;
  pagesNumber?: number;
  rectoProps?: IDocumentProperties;
  versoProps?: IDocumentProperties;

  constructor(docCategory: IDocumentCategory, docsProps: IDocumentProperties[]) {
    this.category = docCategory;
    const relevantDocuments = this.selectRelevantDocumentProperties(docsProps);
    if (relevantDocuments.length === 0) {
      return;
    }
    this.pagesNumber = relevantDocuments.length;
    this.rectoProps = relevantDocuments[0];
    if (relevantDocuments.length > 1) {
      this.versoProps = relevantDocuments[1];
    }
  }

  static computeExpectedPagesNumber(typeId: IDocumentType): number {
    if (typeId === IDocumentType.PASSPORT) {
      return 1;
    }
    return 2;
  }

  // this should be done in back-end
  private selectRelevantDocumentProperties(docsProps: IDocumentProperties[]): IDocumentProperties[] {
    const sortedDocuments = docsProps.sort((a, b) => {
      if (a.typeId === b.typeId) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return a.typeId < b.typeId ? -1 : 1;
    });
    const documentsByTypeId = sortedDocuments.reduce(
      (accumulator, doc) => {
        this.validateDocumentType(doc.typeId);
        if (!accumulator[doc.typeId]) {
          accumulator[doc.typeId] = [doc];
        } else if (accumulator[doc.typeId].length < Document.computeExpectedPagesNumber(doc.typeId)) {
          // here we keep the latest document properties up to the number of pages expected for each type
          accumulator[doc.typeId].push(doc);
        }
        return accumulator;
      },
      {} as { [key in IDocumentType]: IDocumentProperties[] },
    );
    // then we keep documents with typeID for which we have the expected number of pages
    const typeId = ALLOWED_DOCUMENT_TYPES[this.category].find(
      (typeId: IDocumentType) =>
        documentsByTypeId[typeId] &&
        documentsByTypeId[typeId].length === Document.computeExpectedPagesNumber(typeId),
    );
    if (!typeId) {
      return [];
    }
    return documentsByTypeId[typeId];
  }

  private validateDocumentType(type: IDocumentType): void {
    if (!ALLOWED_DOCUMENT_TYPES[this.category].includes(type)) {
      throw new CustomerError.InvalidDocumentType(
        `${type} is not a valid document type for context ${this.addPage}`,
      );
    }
  }
  public addPage(page: string, name: IDocumentPage) {
    if (name === 'recto') {
      this.recto = page;
    }
    if (name === 'verso') {
      if (this.pagesNumber === 1) {
        throw new CustomerError.MaxPagesReached();
      }
      this.verso = page;
    }
  }

  get value(): { recto: string; verso?: string } {
    if (!this.recto) throw new CustomerError.MissingRecto();
    if (this.pagesNumber === 2) {
      if (!this.verso) throw new CustomerError.MissingVerso();
    }
    if (this.pagesNumber === 2) {
      return {
        recto: this.recto,
        verso: this.verso,
      };
    } else {
      return {
        recto: this.recto,
      };
    }
  }
}
