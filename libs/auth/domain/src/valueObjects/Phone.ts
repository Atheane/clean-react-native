/* eslint-disable @typescript-eslint/no-explicit-any */
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import { AuthError } from '../errors';

export class Phone {
  private readonly phoneUtil: PhoneNumberUtil;
  private readonly numberProto: any;
  public readonly countryCode: string;

  constructor(phone: string, countryCode: string) {
    this.phoneUtil = PhoneNumberUtil.getInstance();
    this.countryCode = countryCode;
    this.numberProto = this.phoneUtil.parse(phone, this.countryCode);

    if (!this.validate()) {
      throw new AuthError.InvalidPhone('Invalid phone');
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
}
