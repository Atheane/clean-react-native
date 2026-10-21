import { HttpConnection, IHttpVerb, ServerError } from '@clean-rn/shared/infrastructure';
import {
  IDocumentProperties,
  IDocumentRepository,
  DocumentVO,
  IDocumentStatus,
  IDocumentCategory,
} from '@clean-rn/kyc/domain';
import { IDocumentServer } from '../types';

export class KycApi implements IDocumentRepository {
  private static instance: KycApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getDocuments = this.getDocuments.bind(this);
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
      category: IDocumentCategory[doc.documentContext as keyof typeof IDocumentCategory],
      typeId: doc.documentTypeId,
      status: IDocumentStatus[doc.documentStatus as keyof typeof IDocumentStatus],
      name: doc.name,
      createdAt: new Date(doc.createdAt),
    }));
  }

  async createOnePageDocument({
    customerId,
    document,
  }: {
    customerId: string;
    document: DocumentVO;
  }): Promise<DocumentVO> {
    const params = {
      documentContext: document.properties.category,
      documentTypeId: document.properties.typeId,
      name: document.properties.name,
      userId: customerId,
      fileContentBase64: document.value.recto,
    };

    const response = await fetch(
      `${this.connection.baseUrl}/app/document/kyc`,
      this.connection.options(IHttpVerb.POST, params),
    );
    await this.connection.handleError(response);
    const documentServer = await response.json();

    const documentProperties = {
      category: IDocumentCategory[documentServer.documentContext as keyof typeof IDocumentCategory],
      typeId: documentServer.documentTypeId,
      status: IDocumentStatus[documentServer.documentStatus as keyof typeof IDocumentStatus],
      name: documentServer.name,
      createdAt: new Date(documentServer.createdAt),
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
    });

    documentRecto.addPage(document.value.recto);

    if (document.value.verso) {
      document.properties.name = document.properties.name.replace('recto', 'verso');
      await this.createOnePageDocument({
        customerId,
        document,
      });
      documentRecto.addPage(document.value.verso);
      return documentRecto;
    }

    return documentRecto;
  }
}
