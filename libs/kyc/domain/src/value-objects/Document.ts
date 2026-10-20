import {
  IDocumentPage,
  IDocumentType,
  IDocumentProperties,
  IDocumentCategory,
  IDocumentStatus,
} from '../types';
import { ALLOWED_DOCUMENT_TYPES } from '../constants';
import { CustomerError } from '../errors';

export class Document {
  private category: IDocumentCategory;
  recto?: string;
  verso?: string;
  pagesNumber?: number;
  rectoProps?: IDocumentProperties;
  versoProps?: IDocumentProperties;
  status?: IDocumentStatus;

  constructor(docCategory: IDocumentCategory, docsProps: IDocumentProperties[]) {
    this.category = docCategory;
    const relevantDocuments = this.selectRelevantDocumentProperties(docsProps);
    if (relevantDocuments.length === 0) {
      return;
    }
    this.pagesNumber = relevantDocuments.length;
    this.rectoProps = relevantDocuments[0];
    if (this.pagesNumber === 2) {
      this.versoProps = relevantDocuments[1];
    }
    this.checkDocumentStatus();
  }

  static computeExpectedPagesNumber(typeId: IDocumentType): number {
    if ([IDocumentType.ID, IDocumentType.RESIDENT_PERMIT, IDocumentType.DRIVING_LICENSE].includes(typeId)) {
      return 2;
    }
    return 1;
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

  get isReady(): boolean {
    if (this.pagesNumber === 2) {
      return !!this.recto && !!this.verso;
    }
    return !!this.recto;
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

  private checkDocumentStatus() {
    this.status = this.rectoProps?.status;
    if (this.pagesNumber === 2) {
      if (
        this.rectoProps?.status === IDocumentStatus.REFUSED ||
        this.versoProps?.status === IDocumentStatus.REFUSED
      ) {
        this.status = IDocumentStatus.REFUSED;
      } else if (
        this.rectoProps?.status === IDocumentStatus.CANCELED ||
        this.versoProps?.status === IDocumentStatus.CANCELED
      ) {
        this.status = IDocumentStatus.CANCELED;
      } else if (
        this.rectoProps?.status === IDocumentStatus.VALIDATED &&
        this.versoProps?.status === IDocumentStatus.VALIDATED
      ) {
        this.status = IDocumentStatus.VALIDATED;
      } else {
        this.status = IDocumentStatus.PENDING;
      }
    }
  }
}
