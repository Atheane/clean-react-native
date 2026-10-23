import { LastName } from '../value-objects';

describe('LastNameVO - unit', () => {
  it('should throw a BeneficiaryError.InvalidName', () => {
    expect(new LastName('CO2').value).toEqual('CO2');
  });
  it('should return LastName value if composed last name', () => {
    expect(new LastName('Nom-Compose').value).toEqual('Nom-Compose');
  });
  it('should return LastName if last name with simple particle', () => {
    expect(new LastName('De Ravel').value).toEqual('De Ravel');
  });
});
