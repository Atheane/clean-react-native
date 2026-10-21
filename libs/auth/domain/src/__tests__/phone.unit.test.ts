import { Phone } from '../value-objects';
import { AuthError } from '../errors';

describe('PhoneVO - unit', () => {
  it('should throw an error if the country code is not available', () => {
    const countryCode = 'FR';
    expect(() => new Phone('1111', countryCode)).toThrow(new AuthError.InvalidPhone('Invalid phone'));
  });

  it('should be ok with FR and 0600000001', () => {
    const countryCode = 'FR';
    expect(new Phone('0600000001', countryCode).value).toEqual('+33600000001');
  });

  it('should be ok with FR and 0600000001', () => {
    const countryCode = 'FR';
    expect(new Phone('0600000001', countryCode).value).toEqual('+33600000001');
  });

  it('should be ok with FR and +33600000001', () => {
    const countryCode = 'FR';
    expect(new Phone('+33600000001', countryCode).valueInternational).toEqual('+33600000001');
  });
});
