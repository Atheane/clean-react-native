import { PhoneNumberUtil } from 'google-libphonenumber';
import countryFlagEmoji from 'country-flag-emoji';
import { AuthError } from '@auth/domain/errors';
import { COUNTRIES_AVAILABLE } from '@auth/domain/constants';

export class Country {
  private readonly emoji: string;
  private readonly countryCode: string;
  private readonly name: string;

  constructor(countryCode: string) {
    this.countryCode = countryCode;
    if (!this.validate()) {
      throw new AuthError.InvalidCountry('Invalid country code');
    }
    this.emoji = countryFlagEmoji.data[countryCode].emoji;
    this.name = countryFlagEmoji.data[countryCode].name;
  }

  private validate(): boolean {
    return !!countryFlagEmoji.data[this.countryCode];
  }

  public validateAvailability(): boolean {
    if (!COUNTRIES_AVAILABLE[this.countryCode]) {
      throw new AuthError.UnavailableCountry('Country not available');
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
}
