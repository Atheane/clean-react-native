import { PhoneNumberUtil } from 'google-libphonenumber';
import { COUNTRIES_AVAILABLE } from '@clean-rn/contact/domain';
import { UserError } from '../errors';
import { Country } from '../value-objects';

describe('CountryVO - unit', () => {
  it('should validateAvailability if the country code is available', () => {
    const validCountryCode = 'FR';
    const country = new Country(validCountryCode);
    expect(country.validateAvailability()).toEqual(true);
  });

  it('should throw an error if the country code is not available', () => {
    const invalidCountryCode = 'US';
    const country = new Country(invalidCountryCode);
    expect(() => country.validateAvailability()).toThrow(
      new UserError.UnavailableCountry('Country not available'),
    );
  });

  it('should throw an error if the country code is not valid', () => {
    const invalidCountryCode = 'azeaze';
    expect(() => new Country(invalidCountryCode)).toThrow(
      new UserError.InvalidCountry('Invalid country code'),
    );
  });

  it('should return the country code', () => {
    const validCountryCode = 'FR';
    const country = new Country(validCountryCode);
    expect(country.value).toEqual(validCountryCode);
  });

  it('should return the country flag and extension', () => {
    const validCountryCode = 'FR';
    const country = new Country(validCountryCode);
    expect(country.valueFlagAndExtension).toEqual(
      `${
        COUNTRIES_AVAILABLE[validCountryCode].emoji
      } +${PhoneNumberUtil.getInstance().getCountryCodeForRegion(validCountryCode)}`,
    );
  });

  it('should return the country flag and country', () => {
    const validCountryCode = 'FR';
    const country = new Country(validCountryCode);
    expect(country.valueFlagAndName).toEqual(
      `${COUNTRIES_AVAILABLE[validCountryCode].emoji}   ${COUNTRIES_AVAILABLE[validCountryCode].name}`,
    );
  });
});
