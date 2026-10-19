import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import { ITransaction, ITransactionRepository } from '@clean-rn/account/domain';

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
    return transactions.map((transaction: ITransaction) => ({
      ...transaction,
    }));
  }
}
