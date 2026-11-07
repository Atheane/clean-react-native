import { Entity } from '@clean-rn/ddd';
import { KYC_REVIEW } from '@clean-rn/user/domain';
import { ITransaction, ITransactionType } from '@clean-rn/transaction/domain';
import { KYC_EVENTS } from '../events';
import { IStepStatus, IStepTypes } from '../types';
import { DocumentVO } from '../value-objects';
import { EXPECTED_STEPS_NUMBER } from '../constants';
import { IDocumentType } from '../types';
import { DocumentError } from '../errors';
import { IRegisterRevenuesCommand } from '../commands';

type ISteps = { [key in IStepTypes]: IStepStatus | undefined };

export interface ICustomerProperties {
  // todo part of the actual user should be moved to customer entity
  status: KYC_REVIEW;
  numberOfSteps: number;
  USPerson: boolean;
  steps: ISteps;
  reviewComment: string;
  currentDocument?: DocumentVO;
}

export class Customer extends Entity<ICustomerProperties> {
  private constructor({ id, properties }: { id?: string } & { properties: Partial<ICustomerProperties> }) {
    super({ id, properties });
  }

  static Create({
    id,
    properties,
  }: {
    id: number;
    properties: {
      status?: KYC_REVIEW;
      USPerson: boolean;
      steps?: ISteps;
      reviewComment: string;
      currentDocument?: DocumentVO;
    };
  }) {
    const numberOfSteps = properties.USPerson ? EXPECTED_STEPS_NUMBER + 1 : EXPECTED_STEPS_NUMBER;
    const customer = new Customer({ id: id.toString(), properties: { ...properties, numberOfSteps } });
    if (!properties.steps) {
      customer.properties.steps = {
        [IStepTypes.W9]: undefined,
        [IStepTypes.ID]: undefined,
        [IStepTypes.INFORMATIONS]: undefined,
        [IStepTypes.SCT]: undefined,
      };
    }
    Customer.emitStaticDomainEvent(KYC_EVENTS.CUSTOMER_CREATED, customer);
    return customer;
  }

  checkKYCStatus(status: KYC_REVIEW): void {
    this.properties.status = status;
    Customer.emitStaticDomainEvent(KYC_EVENTS.KYC_STATUS_CHECKED, this);
  }

  checkStepRevenues(revenues: IRegisterRevenuesCommand | undefined): void {
    if (this.properties.steps === undefined) {
      this.properties.steps = {
        [IStepTypes.W9]: undefined,
        [IStepTypes.ID]: undefined,
        [IStepTypes.INFORMATIONS]: undefined,
        [IStepTypes.SCT]: undefined,
      };
    }
    if (revenues === undefined) {
      this.properties.steps[IStepTypes.INFORMATIONS] = IStepStatus.INIT;
    } else {
      this.properties.steps[IStepTypes.INFORMATIONS] = IStepStatus.VALIDATED;
    }
    Customer.emitStaticDomainEvent(KYC_EVENTS.REVENUES_CHECKED, this);
  }

  checkStepSct(transactions: ITransaction[]): void {
    if (this.properties.steps === undefined) {
      this.properties.steps = {
        [IStepTypes.W9]: undefined,
        [IStepTypes.ID]: undefined,
        [IStepTypes.INFORMATIONS]: undefined,
        [IStepTypes.SCT]: undefined,
      };
    }
    if (transactions.length === 0) {
      this.properties.steps[IStepTypes.SCT] = IStepStatus.INIT;
    } else if (
      transactions.length > 0 &&
      transactions.find((transaction: ITransaction) => transaction.type === ITransactionType.PAYIN)
    ) {
      this.properties.steps[IStepTypes.SCT] = IStepStatus.VALIDATED;
    }
    Customer.emitStaticDomainEvent(KYC_EVENTS.SCT_CHECKED, this);
  }

  checkStepID(documents: DocumentVO[]): void {
    if (this.properties.steps === undefined) {
      this.properties.steps = {
        [IStepTypes.W9]: undefined,
        [IStepTypes.ID]: undefined,
        [IStepTypes.INFORMATIONS]: undefined,
        [IStepTypes.SCT]: undefined,
      };
    }

    if (documents.length === 0) {
      this.properties.steps[IStepTypes.ID] = IStepStatus.INIT;
      Customer.emitStaticDomainEvent(KYC_EVENTS.ID_CHECKED, this);
      return;
    }

    // Filtrer les documents par type d'identité
    const idDocuments = documents.filter((doc: DocumentVO) => doc.context === IStepTypes.ID);

    if (idDocuments.length === 0) {
      this.properties.steps[IStepTypes.ID] = IStepStatus.INIT;
      Customer.emitStaticDomainEvent(KYC_EVENTS.ID_CHECKED, this);
      return;
    }

    // Grouper les documents par typeId
    const documentsByType = idDocuments.reduce(
      (acc, doc) => {
        if (!acc[doc.typeId]) {
          acc[doc.typeId] = [];
        }
        acc[doc.typeId].push(doc);
        return acc;
      },
      {} as { [key in IDocumentType]: DocumentVO[] },
    );

    // Trouver le type de document le plus récent
    let mostRecentTypeId: string | null = null;
    let mostRecentDate: Date | null = null;

    Object.entries(documentsByType).forEach(([typeId, docs]) => {
      // Trouver le document le plus récent pour ce type
      const mostRecentDocForType = docs.reduce((mostRecent, current) => {
        return new Date(current.createdAt) > new Date(mostRecent.createdAt) ? current : mostRecent;
      }, docs[0]);

      // Vérifier si c'est le plus récent globalement
      if (!mostRecentDate || new Date(mostRecentDocForType.createdAt) > mostRecentDate) {
        mostRecentDate = new Date(mostRecentDocForType.createdAt);
        mostRecentTypeId = typeId;
      }
    });

    // Pour le type de document le plus récent, prendre les plus récents selon le nombre de pages attendu
    let validDocuments: DocumentVO[] = [];
    if (mostRecentTypeId) {
      const typeIdAsNumber = parseInt(mostRecentTypeId) as IDocumentType;
      const docs = documentsByType[typeIdAsNumber];
      const expectedPages = DocumentVO.computeExpectedPagesNumber(typeIdAsNumber);

      validDocuments = docs
        .sort(
          (a: DocumentVO, b: DocumentVO) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, expectedPages);
    }

    // Vérifier si tous les documents sont valides
    const allValid = validDocuments.every((doc) => doc.status === IStepStatus.VALIDATED);
    const anyRefused = validDocuments.some((doc) => doc.status === IStepStatus.REFUSED);
    const anyCanceled = validDocuments.some((doc) => doc.status === IStepStatus.CANCELED);

    if (anyCanceled) {
      this.properties.steps[IStepTypes.ID] = IStepStatus.CANCELED;
    } else if (anyRefused) {
      this.properties.steps[IStepTypes.ID] = IStepStatus.REFUSED;
    } else if (allValid) {
      this.properties.steps[IStepTypes.ID] = IStepStatus.VALIDATED;
    } else {
      this.properties.steps[IStepTypes.ID] = IStepStatus.PENDING;
    }

    Customer.emitStaticDomainEvent(KYC_EVENTS.ID_CHECKED, this);
  }

  checkStepW9(documents: DocumentVO[]): void {
    if (this.properties.steps === undefined) {
      this.properties.steps = {
        [IStepTypes.W9]: undefined,
        [IStepTypes.ID]: undefined,
        [IStepTypes.INFORMATIONS]: undefined,
        [IStepTypes.SCT]: undefined,
      };
    }

    if (documents.length === 0) {
      this.properties.steps[IStepTypes.W9] = IStepStatus.INIT;
      Customer.emitStaticDomainEvent(KYC_EVENTS.W9_CHECKED, this);
      return;
    }

    // Filtrer les documents par type de certificat fiscal
    const w9Documents = documents.filter((doc) => doc.context === IStepTypes.W9);

    if (w9Documents.length === 0) {
      this.properties.steps[IStepTypes.W9] = IStepStatus.INIT;
      Customer.emitStaticDomainEvent(KYC_EVENTS.W9_CHECKED, this);
      return;
    }

    // Trier par creationDate décroissant et prendre le plus récent
    const latestDocument = w9Documents.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];

    // Déterminer le statut
    if (latestDocument.status === IStepStatus.CANCELED) {
      this.properties.steps[IStepTypes.W9] = IStepStatus.CANCELED;
    } else if (latestDocument.status === IStepStatus.REFUSED) {
      this.properties.steps[IStepTypes.W9] = IStepStatus.REFUSED;
    } else if (latestDocument.status === IStepStatus.VALIDATED) {
      this.properties.steps[IStepTypes.W9] = IStepStatus.VALIDATED;
    } else {
      this.properties.steps[IStepTypes.W9] = IStepStatus.PENDING;
    }

    Customer.emitStaticDomainEvent(KYC_EVENTS.W9_CHECKED, this);
  }

  createDocument(document: DocumentVO): void {
    this.properties.currentDocument = document;
    Customer.emitStaticDomainEvent(KYC_EVENTS.DOCUMENT_CREATED, this);
  }

  addPage(page: string): void {
    if (!this.properties.currentDocument) {
      throw new DocumentError.DocumentNotReady();
    }
    this.properties.currentDocument.addPage(page);
    Customer.emitStaticDomainEvent(KYC_EVENTS.DOCUMENT_PAGE_ADDED, this);
  }

  sendDocument(): void {
    if (!this.properties.steps || !this.properties.currentDocument) {
      return;
    }
    if (this.properties.currentDocument.context === IStepTypes.ID) {
      this.properties.steps[IStepTypes.ID] = IStepStatus.PENDING;
    } else if (this.properties.currentDocument.context === IStepTypes.INFORMATIONS) {
      this.properties.steps[IStepTypes.INFORMATIONS] = IStepStatus.PENDING;
    }
    this.properties.currentDocument = undefined;
    Customer.emitStaticDomainEvent(KYC_EVENTS.DOCUMENT_SENT, this);
  }

  // commentReview(comment: string): void {
  //   this.properties.reviewComment = comment;
  //   Customer.emitStaticDomainEvent(KYC_EVENTS.REVIEW_COMMENTED, this);
  // }
}
