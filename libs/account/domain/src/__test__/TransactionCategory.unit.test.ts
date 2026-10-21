import { TransactionCategory } from '../value-objects';
import { AccountError } from '../errors';
import { ITransactionCategory, ITransactionType } from '../types';

describe('TransactionCategoryVO - unit', () => {
  it('should return throw a AccountError.UnknownTransactionType', () => {
    expect(() => new TransactionCategory('UNKNOWN', 20)).toThrow(new AccountError.UnknownTransactionType());
  });
  it('should return throw a AccountError.InvalidTransaction', () => {
    expect(new TransactionCategory(ITransactionType.CARD_TRANSACTION).value).toEqual(
      ITransactionCategory.DIVERSE,
    );
  });

  it('should return correct category if CARD_TRANSACTION', () => {
    expect(new TransactionCategory(ITransactionType.CARD_TRANSACTION, 5422).value).toEqual(
      ITransactionCategory.NUTRITION,
    );
  });
});
