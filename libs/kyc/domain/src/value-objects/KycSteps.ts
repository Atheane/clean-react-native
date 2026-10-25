import { arrayIsEmpty } from '@clean-rn/shared/domain';

import { IDocumentProperties, IDocumentStatus, IDocumentType, IKycState, IKycSteps } from '../types';
import { ALLOWED_DOCUMENT_TYPES, EXPECTED_STEPS_NUMBER } from '../constants';
import { DocumentError } from '../errors';
import { KYC_REVIEW } from '@clean-rn/user/domain';
import { ITransaction, ITransactionType } from '@clean-rn/transaction/domain';

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

export class KycSteps {
  steps: { [key in IKycSteps]: DocumentVO | boolean | undefined } = {
    [IKycSteps.W9]: undefined,
    [IKycSteps.ID]: undefined,
    [IKycSteps.SCT]: undefined,
  };
  isUSPerson: boolean;
  state: IKycState;
  stepsCount: number;

  constructor({
    docProps,
    transactions,
    USPerson,
  }: {
    docProps: IDocumentProperties[];
    transactions: ITransaction[];
    USPerson?: boolean;
  }) {
    const documentsByCategory = this.allocateDocumentsByCategory(docProps);
    Object.keys(documentsByCategory).forEach((cat) => {
      this.processCategoryDocuments(cat as IKycSteps.W9 | IKycSteps.ID, documentsByCategory);
    });
    this.isUSPerson = !!USPerson;
    this.stepsCount = this.setExpectedStepsCount();
    this.validateSct(transactions);
    this.state = this.computeState();
  }

  setState(state: KYC_REVIEW): void {
    if (state === KYC_REVIEW.REFUSED) this.state = IKycState.REFUSED;
    if (state === KYC_REVIEW.PENDING) this.state = IKycState.PENDING;
  }

  addDocument(document: DocumentVO): void {
    this.validateDocumentType(document.properties.kycStep, document.properties.typeId);
    this.steps[document.properties.kycStep] = document;
    this.stepsCount = this.setExpectedStepsCount();
    this.state = this.computeState();
  }

  validateSct(transactions: ITransaction[]): void {
    if (
      transactions.filter((transaction: ITransaction) => transaction?.type === ITransactionType.PAYIN)
        .length > 0
    ) {
      this.steps[IKycSteps.SCT] = true;
    }
  }

  private computeState(): IKycState {
    const pendingSteps = Object.values(this.steps).filter(
      (step) =>
        (step instanceof DocumentVO &&
          [IDocumentStatus.PENDING, IDocumentStatus.VALIDATED].includes(step.properties.status)) ||
        step === true,
    );
    const validatedSteps = Object.values(this.steps).filter(
      (step) =>
        (step instanceof DocumentVO && step.properties.status === IDocumentStatus.VALIDATED) || step === true,
    );
    const refusedDocs = Object.values(this.steps).some(
      (step) => step instanceof DocumentVO && step.properties.status === IDocumentStatus.REFUSED,
    );
    if (Object.values(this.steps).every((step) => !step)) return IKycState.INIT;
    else if (validatedSteps.length === this.stepsCount) return IKycState.STEPS_COMPLETED;
    else if (refusedDocs) return IKycState.REFUSED;
    else if (pendingSteps.length === this.stepsCount) return IKycState.PENDING;
    else return IKycState.INCOMPLETE;
  }

  private setExpectedStepsCount(): number {
    let expectedDocumentCount = EXPECTED_STEPS_NUMBER;
    if (this.isUSPerson) {
      expectedDocumentCount += 1;
    }
    return expectedDocumentCount;
  }

  private processCategoryDocuments(
    category: IKycSteps.W9 | IKycSteps.ID,
    documentsByCategory: { [key in IKycSteps.W9 | IKycSteps.ID]: IDocumentProperties[] },
  ): void {
    if (!arrayIsEmpty(documentsByCategory[category])) {
      const relevantDocumentProperties = this.filterRelevantDocumentProperties(documentsByCategory[category]);
      if (!arrayIsEmpty(relevantDocumentProperties)) {
        const docStatus = this.checkDocumentStatus(relevantDocumentProperties);
        this.steps[category] = new DocumentVO({
          ...relevantDocumentProperties[0],
          status: docStatus,
        });
      }
    }
  }

  private validateDocumentType(category: IKycSteps.W9 | IKycSteps.ID, type: IDocumentType): void {
    if (!ALLOWED_DOCUMENT_TYPES[category].includes(type)) {
      throw new DocumentError.InvalidDocumentType(
        `${type} is not a valid document type for context ${category}`,
      );
    }
  }

  // this should be done in back-end
  private allocateDocumentsByCategory(docsProps: IDocumentProperties[]): {
    [key in IKycSteps.W9 | IKycSteps.ID]: IDocumentProperties[];
  } {
    const groupedByCategory = docsProps.reduce(
      (accumulator, doc) => {
        if (!accumulator[doc.kycStep]) {
          accumulator[doc.kycStep] = [doc];
        } else {
          accumulator[doc.kycStep].push(doc);
        }
        return accumulator;
      },
      {} as { [key in IKycSteps.W9 | IKycSteps.ID]: IDocumentProperties[] },
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
