/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { UserError } from '../errors';
import { COUNTRIES_AVAILABLE } from '@clean-rn/utils';

export class Phone {
  private readonly phoneUtil: PhoneNumberUtil;
  private readonly numberProto: any;
  public readonly countryCode?: string;

  constructor(phone: string, countryCode?: string) {
    this.phoneUtil = PhoneNumberUtil.getInstance();
    if (countryCode) {
      this.countryCode = countryCode;
      this.numberProto = this.phoneUtil.parse(phone, this.countryCode);
    } else {
      this.numberProto = this.phoneUtil.parse(phone);
    }
    if (!this.validate()) {
      throw new UserError.InvalidPhone('Invalid phone');
    }
  }

  private validate(): boolean {
    return this.phoneUtil.isValidNumber(this.numberProto);
  }

  get value(): string {
    const formattedPhone = this.phoneUtil
      .format(this.numberProto, PhoneNumberFormat.INTERNATIONAL)
      .replace('+', '')
      .replace(/\s/g, '');
    return formattedPhone;
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
