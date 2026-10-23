import { Phone } from '../value-objects';
import { ContactError } from '../errors';

describe('PhoneVO - unit', () => {
  it('should be ok for FR with mobile number such as 0600000001 and country code FR', () => {
    const phone = new Phone('0600000001', 'FR');
    expect(phone.valueInternational).toEqual('+33600000001');
    expect(phone.countryCode).toEqual('FR');
  });

  it('should be ok for FR with mobile number such as 0600000001 and country code FR', () => {
    const phone = new Phone('0600000001', 'FR');
    expect(phone.valueInternational).toEqual('+33600000001');
    expect(phone.countryCode).toEqual('FR');
  });

  it('should throw InvalidCountryCode for undefined country code', () => {
    expect(() => new Phone('0600000001', undefined)).toThrow(new ContactError.InvalidCountryCode());
  });

  it('should throw invalid phone format for non mobile number', () => {
    expect(() => new Phone('0241234567', 'FR')).toThrow(new ContactError.InvalidPhone());
  });

  it('should throw invalid phone format for undefined country code', () => {
    expect(() => new Phone('0600000001', 'US')).toThrow(new ContactError.InvalidCountryCode());
  });

  it('should be ok for FR with mobile number such as +33600000001', () => {
    const phone = new Phone('+33600000001');
    expect(phone.valueInternational).toEqual('+33600000001');
    expect(phone.countryCode).toEqual('FR');
  });

  it('should be ok for UK with mobile phone such as +447700185330', () => {
    const phone = new Phone('+447700185330');
    expect(phone.valueInternational).toEqual('+447700185330');
  });

  it('should be ok for SE with mobile phone such as +46726413204', () => {
    const phone = new Phone('+46726413204');
    expect(phone.valueInternational).toEqual('+46726413204');
  });

  it('should be ok for FI with mobile phone such as +3584573988222', () => {
    const phone = new Phone('+3584573988222');
    expect(phone.valueInternational).toEqual('+3584573988222');
  });

  it('should be ok for LX with mobile phone such as +3197010517088', () => {
    const phone = new Phone('+3197010517088');
    expect(phone.valueInternational).toEqual('+3197010517088');
  });

  it('should be ok for US number but return false at countryIsAvalaible', () => {
    expect(() => new Phone('12013514000', 'US')).toThrow(new ContactError.InvalidCountryCode());
  });
});
