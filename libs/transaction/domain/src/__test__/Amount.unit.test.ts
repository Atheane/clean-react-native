import { Amount } from '../value-objects';
import { TransactionError } from '../errors';
import { ITransactionType } from '../types';

describe('AmountVO - unit', () => {
  it('should return throw a AccountError.UnknownTransactionType', () => {
    expect(() => new Amount('20', 'UNKNOWN')).toThrow(new TransactionError.UnknownTransactionType());
  });
  it('should return throw a AccountError.InvalidTransactionAmount', () => {
    expect(() => new Amount('-20', ITransactionType.PAYIN)).toThrow(
      new TransactionError.InvalidTransactionAmount('Invalid transaction value'),
    );
  });
  it('should return correct value if no transaction type is given', () => {
    expect(new Amount('20').value).toEqual(20);
  });
  it('should return correct value if no transaction type is given and negative amount', () => {
    expect(new Amount('-20').value).toEqual(-20);
  });
  it('should return correct value if CARD_TRANSACTION revenue', () => {
    expect(new Amount('-20', ITransactionType.CARD_TRANSACTION).value).toEqual(20);
  });

  it('should return correct value if CARD_TRANSACTION expense', () => {
    expect(new Amount('20', ITransactionType.CARD_TRANSACTION).value).toEqual(-20);
  });

  it('should return correct value if PAYIN', () => {
    expect(new Amount('20', ITransactionType.PAYIN).value).toEqual(20);
  });
  it('should return correct value if PAYOUT', () => {
    expect(new Amount('20', ITransactionType.PAYOUT).value).toEqual(-20);
  });

  it('should return correct value if TRANSFER_IN', () => {
    expect(new Amount('20', ITransactionType.TRANSFER_IN).value).toEqual(20);
  });
  it('should return correct value if TRANSFER_OUT', () => {
    expect(new Amount('20', ITransactionType.TRANSFER_OUT).value).toEqual(-20);
  });
});
