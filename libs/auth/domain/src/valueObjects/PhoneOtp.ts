import { AuthError } from '../errors';

export class PhoneOtp {
  private readonly otp: string;

  static pattern = /^[0-9]{6}$/i;

  constructor(otp: string) {
    if (!this.validate(otp)) {
      throw new AuthError.Invalid6Digits('Invalid 6 digits code');
    }
    this.otp = otp;
  }

  private validate(otp: string): boolean {
    return PhoneOtp.pattern.test(otp);
  }

  get value(): string {
    return this.otp;
  }
}
