import { LastName } from '../value-objects';
import { BeneficiaryError } from '../errors';

describe('LastNameVO - unit', () => {
  it('should throw a BeneficiaryError.InvalidName', () => {
    expect(() => new LastName('Nom10')).toThrow(new BeneficiaryError.InvalidName('Invalid Name'));
  });
  it('should return LastName value if composed last name', () => {
    expect(new LastName('Nom-Compose').value).toEqual('Nom-Compose');
  });
  it('should return LastName if last name with simple particle', () => {
    expect(new LastName('De Ravel').value).toEqual('De Ravel');
  });
  it('should return LastName if last name with complex particle', () => {
    expect(new LastName("De Ravel D'Esclapon").value).toEqual("De Ravel D'Esclapon");
  });
});
