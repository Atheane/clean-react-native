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
    const amount = rawAmount.replace(',', '.');
    if (isNaN(parseFloat(amount))) {
      throw new TransactionError.InvalidTransactionAmount('Amount must be a number');
    }

    // Vérification du type de transaction
    if (transactionType && !ITransactionType[transactionType]) {
      throw new TransactionError.UnknownTransactionType();
    }

    const parsedAmount = parseFloat(amount);
    if (parsedAmount < 0 && transactionType && transactionType !== ITransactionType.CARD_TRANSACTION) {
      throw new TransactionError.InvalidTransactionAmount(`Amount cannot be negative`);
    }

    // Vérification du nombre de chiffres après la virgule
    const parts = amount.split('.');
    if (parts.length > 1 && parts[1].length > 2) {
      throw new TransactionError.InvalidTransactionAmount(`Amount cannot have more than two decimal places`);
    }

    return parsedAmount;
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
