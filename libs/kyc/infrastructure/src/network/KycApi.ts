import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import { IDocument, IDocumentRepository } from '@clean-rn/kyc/domain';
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

  async getDocuments(): Promise<IDocument[]> {
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
          }
        : {
            typeId: doc.documentTypeId,
            status: doc.documentStatus,
            name: doc.name,
          };
    });
  }
}
