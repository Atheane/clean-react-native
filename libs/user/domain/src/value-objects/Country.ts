/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PhoneNumberUtil } from 'google-libphonenumber';
//@ts-ignore
import countryFlagEmoji from 'country-flag-emoji';
import { COUNTRIES_AVAILABLE } from '@clean-rn/contact/domain';
import { UserError } from '../errors';

export class Country {
  private readonly emoji: string;
  private readonly countryCode: string;
  private readonly name: string;

  constructor(countryCode: string) {
    this.countryCode = countryCode;
    if (!this.validate()) {
      throw new UserError.InvalidCountry('Invalid country code');
    }
    this.emoji = countryFlagEmoji.data[countryCode].emoji;
    this.name = countryFlagEmoji.data[countryCode].name;
  }

  private validate(): boolean {
    return !!countryFlagEmoji.data[this.countryCode];
  }

  public validateAvailability(): boolean {
    //@ts-ignore
    if (!COUNTRIES_AVAILABLE[this.countryCode]) {
      throw new UserError.UnavailableCountry('Country not available');
    }
    return true;
  }

  get value(): string {
    return this.countryCode;
  }

  get valueFlagAndExtension(): string {
    return `${this.emoji} +${PhoneNumberUtil.getInstance().getCountryCodeForRegion(this.countryCode)}`;
  }

  get valueFlagAndName(): string {
    return `${this.emoji}   ${this.name}`;
  }

  get valueName(): string {
    return this.name;
  }
}
