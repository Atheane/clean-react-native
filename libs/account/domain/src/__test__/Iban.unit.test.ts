import { Iban } from '../value-objects';
import { AccountError } from '../errors';

describe('IbanVO - unit', () => {
  it('should return throw a AccountError.InvalidIban', () => {
    expect(() => new Iban('azebjn')).toThrow(new AccountError.InvalidIban('Invalid IBAN'));
  });

  it('should return IBAN value', () => {
    expect(new Iban('FR7616798000010000215323243').value).toEqual('FR7616798000010000215323243');
  });
});
