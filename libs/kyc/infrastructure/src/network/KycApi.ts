import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';

import {
  IDocumentProperties,
  IDocumentRepository,
  DocumentVO,
  IDocumentStatus,
  IDocumentStatusCode,
  IKycSteps,
} from '@clean-rn/kyc/domain';
import { IDocumentServer } from '../types';

export class KycApi implements IDocumentRepository {
  private static instance: KycApi | null = null;
  private connection: HttpConnection;
  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getDocuments = this.getDocuments.bind(this);
    this.createOnePageDocument = this.createOnePageDocument.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): KycApi {
    if (!this.instance) {
      this.instance = new KycApi(httpConnection);
    }
    return this.instance;
  }

  async getDocuments(): Promise<IDocumentProperties[]> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/document/kyc`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const documents = await response.json();
    return documents.map((doc: IDocumentServer) => ({
      kycStep: IKycSteps[doc.documentContext as keyof typeof IKycSteps],
      typeId: doc.documentTypeId,
      status: IDocumentStatus[doc.documentStatus as keyof typeof IDocumentStatus],
      name: doc.name,
      createdAt: new Date(doc.createdAt),
      statusCode: IDocumentStatusCode[doc.documentStatusCode as keyof typeof IDocumentStatusCode],
    }));
  }

  async createOnePageDocument({
    customerId,
    document,
    abortSignal,
  }: {
    customerId: string;
    document: DocumentVO;
    abortSignal?: AbortSignal;
  }): Promise<DocumentVO> {
    const params = {
      documentContext: document.properties.kycStep,
      documentTypeId: document.properties.typeId,
      name: document.properties.name,
      userId: customerId,
      fileContentBase64: document.value.recto,
    };

    const response = await fetch(
      `${this.connection.baseUrl}/app/document/kyc`,
      this.connection.options(IHttpVerb.POST, params, abortSignal),
    );

    await this.connection.handleError(response);
    const documentServer = await response.json();

    const documentProperties = {
      kycStep: documentServer.documentContext as IKycSteps.ID | IKycSteps.W9,
      typeId: documentServer.documentTypeId,
      status: IDocumentStatus[documentServer.documentStatus as keyof typeof IDocumentStatus],
      name: documentServer.name,
      createdAt: new Date(documentServer.createdAt),
      statusCode: IDocumentStatusCode[documentServer.documentStatusCode as keyof typeof IDocumentStatusCode],
    };

    const documentAfterResponse = new DocumentVO(documentProperties);

    return documentAfterResponse;
  }

  async createDocument({
    customerId,
    document,
    abortSignal,
  }: {
    customerId: string;
    document: DocumentVO;
    abortSignal?: AbortSignal;
  }): Promise<DocumentVO> {
    const documentRecto = await this.createOnePageDocument({
      customerId,
      document,
    });

    documentRecto.addPage(document.value.recto);

    if (document.value.verso) {
      document.properties.name = document.properties.name.replace('recto', 'verso');
      await this.createOnePageDocument({
        customerId,
        document,
        abortSignal,
      });
      documentRecto.addPage(document.value.verso);
      return documentRecto;
    }

    return documentRecto;
  }
}
