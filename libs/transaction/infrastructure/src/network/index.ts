import { HttpConnection, IHttpVerb } from '@clean-rn/shared/infrastructure';
import {
  ITransaction,
  ITransactionRepository,
  Amount,
  TransactionCategory,
  ITransactionType,
  ISendTransferCommand,
} from '@clean-rn/transaction/domain';
import { ITransactionServer } from '../types';

export class TransactionApi implements ITransactionRepository {
  private static instance: TransactionApi | null = null;
  private connection: HttpConnection;

  // Make the constructor private to prevent direct instantiation
  private constructor(httpConnection: HttpConnection) {
    this.connection = httpConnection;
    this.getTransactions = this.getTransactions.bind(this);
    this.sendTransfer = this.sendTransfer.bind(this);
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
      amount: new Amount(item.amount.toString(), item.transactionType as ITransactionType),
      label: item.label,
      category: item.mccCode
        ? new TransactionCategory(item.transactionType as ITransactionType, item.mccCode)
        : new TransactionCategory(item.transactionType as ITransactionType),
      date: new Date(item.updatedAt),
      type: item.transactionType as ITransactionType, //todo: maybe delete this, and make use of category only, easier to map, and this is all we need to know in the app
    }));
  }

  async sendTransfer(cmd: ISendTransferCommand): Promise<ITransaction> {
    const params = {
      accountId: cmd.accountId,
      beneficiaryAccountId: cmd.beneficiaryId,
      amount: Math.abs(cmd.amount.value),
      label: cmd.label,
    };

    const response = await fetch(
      `${this.connection.baseUrl}/app/transaction/transfer`,
      this.connection.options(IHttpVerb.POST, params),
    );

    await this.connection.handleError(response);
    const transaction = await response.json();
    return {
      id: transaction.transactionId,
      amount: new Amount(transaction.amount.toString(), transaction.transactionType as ITransactionType),
      label: transaction.label,
      category: new TransactionCategory(transaction.transactionType as ITransactionType),
      date: new Date(transaction.updatedAt),
      type: transaction.transactionType as ITransactionType,
    };
  }
}
