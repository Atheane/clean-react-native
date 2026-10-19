import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import {
  ITransaction,
  ITransactionRepository,
  Amount,
  TransactionCategory,
  ITransactionType,
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
}
