import { ISendTransferCommand } from '../commands';
import { ITransaction } from '../entities';

export interface ITransactionRepository {
  getTransactions(accountId: number): Promise<ITransaction[]>;
  sendTransfer(cmd: ISendTransferCommand): Promise<ITransaction>;
}
