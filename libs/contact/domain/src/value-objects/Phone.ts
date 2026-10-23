import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { getLocales } from 'expo-localization';
import { COUNTRIES_AVAILABLE } from '@clean-rn/user/domain';
import { ContactError } from '../errors';

export class Phone {
  private readonly phoneUtil: PhoneNumberUtil;
  private readonly numberProto: any;
  public countryCode?: string;

  constructor(phone: string, countryCode?: string) {
    this.phoneUtil = PhoneNumberUtil.getInstance();
    if (countryCode) {
      this.countryCode = countryCode;
      this.numberProto = this.phoneUtil.parse(phone, this.countryCode);
    } else {
      const defaultCountry = getLocales()[0]?.regionCode;
      if (!defaultCountry) this.numberProto = this.phoneUtil.parse(phone);
      else {
        this.countryCode = defaultCountry;
        this.numberProto = this.phoneUtil.parse(phone, defaultCountry);
      }
    }
    if (!this.validate()) {
      throw new ContactError.InvalidPhone();
    }
  }

  private validate(): boolean {
    return this.phoneUtil.isValidNumber(this.numberProto);
  }

  get valueInternational(): string {
    const formattedPhone = this.phoneUtil
      .format(this.numberProto, PhoneNumberFormat.INTERNATIONAL)
      .replace(/\s/g, '');
    return formattedPhone;
  }

  get countryIsAvalaible(): boolean {
    const ueCountryCodes = Object.keys(COUNTRIES_AVAILABLE).map(
      (key) => COUNTRIES_AVAILABLE[key as keyof typeof COUNTRIES_AVAILABLE].code as string,
    );
    const regionCode = this.phoneUtil.getRegionCodeForNumber(this.numberProto);
    if (!regionCode) return false;
    return ueCountryCodes.includes(regionCode);
  }
}
