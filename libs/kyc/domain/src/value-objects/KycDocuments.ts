import { arrayIsEmpty } from '@clean-rn/shared/domain';

import { IDocumentCategory, IDocumentProperties, IDocumentStatus, IDocumentType } from '../types';
import { ALLOWED_DOCUMENT_TYPES, EXPECTED_DOCUMENTS_NUMBER } from '../constants';
import { DocumentError } from '../errors';

export class DocumentVO {
  properties: IDocumentProperties;
  private expectedPageCount: number;
  private recto?: string;
  private verso?: string;

  static computeExpectedPagesNumber(typeId: IDocumentType): number {
    if ([IDocumentType.ID, IDocumentType.RESIDENT_PERMIT, IDocumentType.DRIVING_LICENSE].includes(typeId)) {
      return 2;
    }
    return 1;
  }

  constructor(properties: IDocumentProperties) {
    this.expectedPageCount = DocumentVO.computeExpectedPagesNumber(properties.typeId);
    this.properties = properties;
  }

  addPage(page: string) {
    if (this.expectedPageCount === 2 && !!this.recto) {
      this.verso = page;
    } else {
      this.recto = page;
    }
  }

  get isReady(): boolean {
    if (this.expectedPageCount === 2) {
      return !!this.recto && !!this.verso;
    }
    return !!this.recto;
  }

  get value(): { recto: string; verso?: string } {
    return {
      recto: this.recto,
      verso: this.verso,
    };
  }
}

export class KycDocuments {
  documents: { [key in IDocumentCategory]: DocumentVO | undefined } = {
    [IDocumentCategory.W9]: undefined,
    [IDocumentCategory.ID]: undefined,
    [IDocumentCategory.RESIDENCE_PROOF]: undefined,
    [IDocumentCategory.RESIDENCE_PROOF_ID]: undefined,
    [IDocumentCategory.RESIDENCE_PROOF_SWORN_STATEMENT]: undefined,
  };
  isUSPerson: boolean;
  isHosted: boolean;
  expectedDocumentCount: number;

  constructor(docsProps: IDocumentProperties[], USPerson?: boolean) {
    const documentsByCategory = this.allocateDocumentsByCategory(docsProps);
    Object.keys(documentsByCategory).forEach((category) => {
      this.processCategoryDocuments(category as IDocumentCategory, documentsByCategory);
    });
    this.isUSPerson = !!USPerson;
    this.isHosted = this.setIsHosted();
    this.expectedDocumentCount = this.setExpectedDocumentCount();
  }

  addDocument(document: DocumentVO): void {
    this.validateDocumentType(document.properties.category, document.properties.typeId);
    this.documents[document.properties.category] = document;
    this.isHosted = this.setIsHosted();
    this.expectedDocumentCount = this.setExpectedDocumentCount();
  }

  get isComplete(): boolean {
    const requiredDocs = Object.values(this.documents).filter((doc) => doc !== undefined);
    return requiredDocs.length === this.expectedDocumentCount;
  }

  private setIsHosted(): boolean {
    if (
      this.documents.RESIDENCE_PROOF_ID ||
      this.documents.RESIDENCE_PROOF_SWORN_STATEMENT ||
      this.documents.RESIDENCE_PROOF?.properties.name.includes('host')
    ) {
      return true;
    }
    return false;
  }

  private setExpectedDocumentCount(): number {
    let expectedDocumentCount = EXPECTED_DOCUMENTS_NUMBER;
    if (this.isHosted) {
      expectedDocumentCount += 2;
    }
    if (this.isUSPerson) {
      expectedDocumentCount += 1;
    }
    return expectedDocumentCount;
  }

  private processCategoryDocuments(
    category: IDocumentCategory,
    documentsByCategory: { [key in IDocumentCategory]: IDocumentProperties[] },
  ): void {
    if (!arrayIsEmpty(documentsByCategory[category])) {
      const relevantDocumentProperties = this.filterRelevantDocumentProperties(documentsByCategory[category]);
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
    const groupedByCategory = docsProps.reduce(
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
    return groupedByCategory;
  }

  private filterRelevantDocumentProperties(docsProps: IDocumentProperties[]): IDocumentProperties[] {
    // Group documentProperties by typeId
    const groupedByTypeId = docsProps.reduce(
      (accumulator, doc) => {
        if (!accumulator[doc.typeId]) {
          accumulator[doc.typeId] = [doc];
        } else {
          accumulator[doc.typeId].push(doc);
        }
        return accumulator;
      },
      {} as { [key in number]: IDocumentProperties[] },
    );

    // Get the last documents based on expected page number for each typeId
    const lastRelevantDocs = Object.entries(groupedByTypeId).reduce(
      (acc: { [key: number]: IDocumentProperties[] }, [typeId, properties]) => {
        const expectedPages = DocumentVO.computeExpectedPagesNumber(parseInt(typeId));
        if (properties.length >= expectedPages) {
          acc[parseInt(typeId)] = properties.slice(-expectedPages);
        }
        return acc;
      },
      {},
    );

    // Find the typeId with the most recent documents
    let mostRecentDate = new Date(0);
    let mostRecentTypeId = -1;

    Object.entries(lastRelevantDocs).forEach(([typeId, properties]) => {
      properties.forEach((doc) => {
        const createdAtDate = new Date(doc.createdAt);
        if (createdAtDate > mostRecentDate) {
          mostRecentDate = createdAtDate;
          mostRecentTypeId = parseInt(typeId);
        }
      });
    });
    return lastRelevantDocs[mostRecentTypeId] || [];
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
