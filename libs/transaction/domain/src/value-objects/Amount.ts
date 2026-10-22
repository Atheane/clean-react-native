import { ITransactionType } from '../types';
import { TransactionError } from '../errors';

export class Amount {
  private readonly rawAmount: number;
  private readonly transactionType?: ITransactionType;

  constructor(rawAmount: string, transactionType?: ITransactionType) {
    this.rawAmount = this.validate(rawAmount, transactionType);
    if (transactionType) {
      this.transactionType = transactionType;
    }
  }

  private validate(rawAmount: string, transactionType?: ITransactionType): number {
    if (isNaN(parseFloat(rawAmount.replace(',', '.')))) {
      throw new TransactionError.InvalidTransactionAmount('Amount must be a number');
    }
    if (transactionType && !ITransactionType[transactionType]) {
      throw new TransactionError.UnknownTransactionType();
    }
    if (
      parseFloat(rawAmount.replace(',', '.')) < 0 &&
      transactionType &&
      transactionType !== ITransactionType.CARD_TRANSACTION
    ) {
      throw new TransactionError.InvalidTransactionAmount(`Amount cannot be negative`);
    }
    return parseFloat(rawAmount.replace(',', '.'));
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
