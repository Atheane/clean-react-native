/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhoneNumberUtil, PhoneNumberFormat, PhoneNumberType } from 'google-libphonenumber';
import { COUNTRIES_AVAILABLE } from '../constants';
import { ContactError } from '../errors';

export class Phone {
  private readonly phoneUtil: PhoneNumberUtil;
  private numberProto: any;
  public countryCode: string;

  constructor(phone: string, countryCode?: string) {
    this.phoneUtil = PhoneNumberUtil.getInstance();
    const regionCode = this.parseRegionCodeFromNumber(phone);
    this.countryCode = (regionCode || countryCode) as string;
    this.parseNumber(phone);
    this.validate();
  }

  private parseRegionCodeFromNumber(phone: string): string | undefined {
    try {
      this.numberProto = this.phoneUtil.parse(phone);
      return this.phoneUtil.getRegionCodeForNumber(this.numberProto) as string;
    } catch (e: unknown) {
      // missing international extension in phone number
      return;
    }
  }

  private parseNumber(phone: string): void {
    try {
      this.numberProto = this.phoneUtil.parse(phone, this.countryCode);
    } catch (e: unknown) {
      throw new ContactError.InvalidCountryCode('Invalid country code');
    }
  }

  private validate(): void {
    const ueCountryCodes = Object.keys(COUNTRIES_AVAILABLE).map(
      (key) => COUNTRIES_AVAILABLE[key as keyof typeof COUNTRIES_AVAILABLE].code as string,
    );
    if (!ueCountryCodes.includes(this.countryCode)) {
      throw new ContactError.InvalidCountryCode('Invalid country code');
    }
    // Vérifie si le numéro est valide et si c'est un numéro de téléphone mobile
    if (!this.phoneUtil.isValidNumber(this.numberProto)) {
      throw new ContactError.InvalidPhone('Invalid phone');
    }
    const numberType = this.phoneUtil.getNumberType(this.numberProto);

    if (![PhoneNumberType.MOBILE, PhoneNumberType.FIXED_LINE_OR_MOBILE].includes(numberType)) {
      throw new ContactError.InvalidPhone('Invalid phone');
    }
  }

  get valueInternational(): string {
    const formattedPhone = this.phoneUtil
      .format(this.numberProto, PhoneNumberFormat.INTERNATIONAL)
      .replace(/\s/g, '');
    return formattedPhone;
  }
}
