import { Bic } from '../value-objects';
import { AccountError } from '../errors';

describe('BicVO - unit', () => {
  it('should return throw a AccountError.InvalidBic', () => {
    expect(() => new Bic('azebjn')).toThrow(new AccountError.InvalidBic('Invalid BIC'));
  });
  it('should return BIC value', () => {
    expect(new Bic('TRZOFR21XXX').value).toEqual('TRZOFR21XXX');
  });
});
