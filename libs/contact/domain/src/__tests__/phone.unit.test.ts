import { Phone } from '../value-objects';
import { ContactError } from '../errors';

describe('PhoneVO - unit', () => {
  it('should throw an error if the country code is not available', () => {
    expect(() => new Phone('0600000001').valueInternational).toThrow(new ContactError.InvalidCountryCode());
  });

  it('should throw an error if the country code cannot be inferred', () => {
    expect(() => new Phone('0600000001').valueInternational).toThrow(new ContactError.InvalidCountryCode());
  });

  it('should be ok for FR with mobile number such as 0600000001 and country code FR', () => {
    const phone = new Phone('0600000001', 'FR');
    expect(phone.valueInternational).toEqual('+33600000001');
    expect(phone.countryIsAvalaible).toEqual(true);
  });

  it('should be ok for FR with mobile number such as +33600000001', () => {
    const phone = new Phone('+33600000001');
    expect(phone.valueInternational).toEqual('+33600000001');
    expect(phone.countryIsAvalaible).toEqual(true);
  });

  it('should be ok for UK with mobile phone such as +447700185330', () => {
    const phone = new Phone('+447700185330');
    expect(phone.valueInternational).toEqual('+447700185330');
    expect(phone.countryIsAvalaible).toEqual(true);
  });

  it('should be ok for SW with mobile phone such as +4593705821', () => {
    const phone = new Phone('+4593705821');
    expect(phone.valueInternational).toEqual('+4593705821');
    expect(phone.countryIsAvalaible).toEqual(true);
  });

  it('should be ok for SE with mobile phone such as +46726413204', () => {
    const phone = new Phone('+46726413204');
    expect(phone.valueInternational).toEqual('+46726413204');
    expect(phone.countryIsAvalaible).toEqual(true);
  });

  it('should be ok for FI with mobile phone such as +3584573988222', () => {
    const phone = new Phone('+3584573988222');
    expect(phone.valueInternational).toEqual('+3584573988222');
    expect(phone.countryIsAvalaible).toEqual(true);
  });

  it('should be ok for LX with mobile phone such as +3197010517088', () => {
    const phone = new Phone('+3197010517088');
    expect(phone.valueInternational).toEqual('+3197010517088');
    expect(phone.countryIsAvalaible).toEqual(true);
  });

  it('should be ok for US number but return false at countryIsAvalaible', () => {
    const phone = new Phone('12013514000', 'US');
    expect(phone.valueInternational).toEqual('+1201-351-4000');
    expect(phone.countryIsAvalaible).toEqual(false);
  });
});
