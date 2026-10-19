import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import {
  ITransaction,
  ITransactionRepository,
  Amount,
  TransactionCategory,
  ITransactionType,
  IStatementsPeriod,
} from '@clean-rn/account/domain';
import { ITransactionServer } from '../types';

export class TransactionApi implements ITransactionRepository {
  private static instance: TransactionApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getTransactions = this.getTransactions.bind(this);
  }

  // Public method to provide access to the singleton instance
  public static getInstance(httpConnection: HttpConnection): TransactionApi {
    if (!this.instance) {
      this.instance = new TransactionApi(httpConnection);
    }
    return this.instance;
  }

  async getTransactions(accountId: number): Promise<ITransaction[]> {
    const response = await fetch(
      `${this.connection.baseUrl}/app/transaction/${accountId}`,
      this.connection.options(IHttpVerb.GET),
    );
    await this.connection.handleError(response);
    const transactions = await response.json();
    return transactions.map((item: ITransactionServer) => ({
      id: item.transactionId,
      amount: new Amount(item.amount, item.transactionType as ITransactionType),
      label: item.label,
      category: item.mccCode
        ? new TransactionCategory(item.transactionType as ITransactionType, item.mccCode)
        : new TransactionCategory(item.transactionType as ITransactionType),
      date: new Date(item.updatedAt),
      type: item.transactionType as ITransactionType, //todo: maybe delete this, and make use of category only, easier to map, and this is all we need to know in the app
    }));
  }

  async getStatements(accountId: number, period: IStatementsPeriod) {
    const url =
      `${this.connection.baseUrl}/app/account/${accountId}/statement?` +
      new URLSearchParams({
        period,
      });
    const response = await fetch(url, this.connection.options(IHttpVerb.GET));
    await this.connection.handleError(response);
    const blob = await response.blob();
    console.log('------------------- blob', blob);

    const fileName = blob._data.name;
    console.log('------------------- fileName', fileName);

    return blob;

    // const buff = Buffer.from(JSON.stringify(res._bodyBlob), 'base64');
    // const base64 = buff.toString('base64');

    // const pdfData = `data:application/pdf;base64,${blob}`; //formatted for use with PdfReader library
    // console.log('------------------- pdfData', pdfData);
  }
}
