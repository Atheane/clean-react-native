import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import { IDocumentProperties, IDocumentRepository, DocumentVO } from '@clean-rn/kyc/domain';
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
    return documents.map((doc: IDocumentServer) => {
      return doc.documentStatusCode
        ? {
            typeId: doc.documentTypeId,
            status: doc.documentStatus,
            statusCode: doc.documentStatusCode,
            name: doc.name,
            createdAt: new Date(doc.createdAt),
          }
        : {
            typeId: doc.documentTypeId,
            status: doc.documentStatus,
            name: doc.name,
            createdAt: new Date(doc.createdAt),
          };
    });
  }

  async createDocument({
    customerId,
    document,
  }: {
    customerId: string;
    document: DocumentVO;
  }): Promise<IDocumentProperties[]> {
    const params = {
      documentTypeId: document.properties.type,
      name: document.properties.name,
      userId: customerId,
      fileContentBase64: document.value.recto,
    };
    const responseRecto = await fetch(
      `${this.connection.baseUrl}/app/document/kyc`,
      this.connection.options(IHttpVerb.POST, params),
    );
    await this.connection.handleError(responseRecto);
    if (!document.verso) {
      return [responseRecto.json()];
    } else {
      const responseVerso = await fetch(
        `${this.connection.baseUrl}/app/document/kyc`,
        this.connection.options(IHttpVerb.POST, { ...params, fileContentBase64: document.verso }),
      );
      await this.connection.handleError(responseVerso);
      return [responseRecto.json(), responseVerso.json()];
    }
  }
}
