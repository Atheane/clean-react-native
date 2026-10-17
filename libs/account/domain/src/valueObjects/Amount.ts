import { AccountError } from '../errors';
import { ITransactionType } from '../types';

export class Amount {
  private readonly rawAmount: number;
  private readonly transactionType?: ITransactionType;

  constructor(rawAmount: number, transactionType?: ITransactionType) {
    this.validate(rawAmount, transactionType);
    this.rawAmount = rawAmount;
    if (transactionType) {
      this.transactionType = transactionType;
    }
  }

  private validate(rawAmount: number, transactionType?: ITransactionType): void {
    if (!transactionType) return;
    if (!ITransactionType[transactionType]) {
      throw new AccountError.UnknownTransactionType();
    }
    if (rawAmount < 0 && transactionType !== ITransactionType.CARD_TRANSACTION) {
      throw new AccountError.InvalidTransaction(
        `Amount cannot be negative for transaction type ${transactionType}`,
      );
    }
  }

  get value(): number {
    if (!this.transactionType) return this.rawAmount;
    switch (this.transactionType) {
      case ITransactionType.CARD_TRANSACTION:
        return -this.rawAmount;
      case ITransactionType.PAYIN:
        return this.rawAmount;
      case ITransactionType.PAYOUT:
        return -this.rawAmount;
      case ITransactionType.TRANSFER_IN:
        return this.rawAmount;
      case ITransactionType.TRANSFER_OUT:
        return -this.rawAmount;
    }
  }
}
