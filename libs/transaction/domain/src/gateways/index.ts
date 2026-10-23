import { ITransaction } from '../entities';
import { IPayoutCommand, ITransactionWaitingCommand, ITransferCommand } from '../commands';

export interface ITransactionGateway {
  payout(cmd: IPayoutCommand): Promise<ITransaction>;
  transfer(cmd: ITransferCommand): Promise<ITransaction>;
  sendTransactionWaiting(cmd: ITransactionWaitingCommand): Promise<ITransaction>;
}
