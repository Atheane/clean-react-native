import { AccountError } from '../errors';
import { ITransactionCategory, ITransactionType } from '../types';

export class TransactionCategory {
  private readonly mcc?: number;
  private readonly transactionType: ITransactionType;

  constructor(transactionType: ITransactionType, mcc?: number) {
    if (mcc) {
      this.validate(transactionType, mcc);
    } else {
      this.validate(transactionType);
    }
    if (mcc) this.mcc = mcc;
    this.transactionType = transactionType;
  }

  private validate(transactionType: ITransactionType, mcc?: number): void {
    if (!ITransactionType[transactionType]) {
      throw new AccountError.UnknownTransactionType();
    }
    if (transactionType === ITransactionType.CARD_TRANSACTION && !mcc) {
      throw new AccountError.InvalidTransaction();
    }
    //todo some mcc validation ?
  }

  get value(): ITransactionCategory {
    //todo need relevant categories in app from Gildas
    return ITransactionCategory.NUTRITION;
  }
}
