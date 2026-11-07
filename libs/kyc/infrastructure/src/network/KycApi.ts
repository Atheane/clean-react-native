import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';

import {
  IDocumentRepository,
  DocumentVO,
  IStepStatus,
  IDocumentStatusCode,
  IDocumentType,
  IStepTypes,
} from '@clean-rn/kyc/domain';
import { IDocumentServer } from '../types';

export class KycApi implements IDocumentRepository {
  private static instance: KycApi | null = null;
  private connection: HttpConnection;
  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getDocuments = this.getDocuments.bind(this);
    this.createDocument = this.createDocument.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): KycApi {
    if (!this.instance) {
      this.instance = new KycApi(httpConnection);
    }
    return this.instance;
  }

  async getDocuments(): Promise<DocumentVO[]> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/document/kyc`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const documents = await response.json();
    return documents.map((doc: IDocumentServer) => {
      const document = new DocumentVO({
        typeId: doc.documentTypeId as unknown as IDocumentType,
        status: IStepStatus[doc.documentStatus as keyof typeof IStepStatus],
        createdAt: new Date(doc.createdAt),
        statusCode: IDocumentStatusCode[doc.documentStatusCode as keyof typeof IDocumentStatusCode],
        context: doc.documentContext as unknown as IStepTypes,
        name: doc.name,
      });
      return document;
    });
  }

  async createOnePageDocument({
    customerId,
    document,
    type,
  }: {
    customerId: string;
    document: DocumentVO;
    type: 'recto' | 'verso';
  }): Promise<DocumentVO> {
    const params = {
      documentContext: document.context,
      documentTypeId: document.typeId,
      name: document.name,
      userId: customerId,
      fileContentBase64: type === 'recto' ? document.value.recto : document.value.verso,
    };

    const response = await fetch(
      `${this.connection.baseUrl}/app/document/kyc`,
      this.connection.options(IHttpVerb.POST, params),
    );

    await this.connection.handleError(response);
    const documentServer = await response.json();

    const documentProperties = {
      context: documentServer.documentContext as IStepTypes.ID | IStepTypes.W9,
      typeId: documentServer.documentTypeId,
      status: IStepStatus[documentServer.documentStatus as keyof typeof IStepStatus],
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
  }: {
    customerId: string;
    document: DocumentVO;
  }): Promise<DocumentVO> {
    const documentRecto = await this.createOnePageDocument({
      customerId,
      document,
      type: 'recto',
    });

    if (document.value.recto) {
      documentRecto.addPage(document.value.recto);
      console.log('-----> documentRecto');
    }

    if (document.value.verso) {
      document.name = document.name.replace('recto', 'verso');
      await this.createOnePageDocument({
        customerId,
        document,
        type: 'verso',
      });
      documentRecto.addPage(document.value.verso);
      console.log('-----> documentVerso');
      return documentRecto;
    }

    return documentRecto;
  }
}
