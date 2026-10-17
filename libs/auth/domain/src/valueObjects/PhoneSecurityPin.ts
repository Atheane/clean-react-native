import { AuthError } from '@auth/domain/errors';

export class PhoneSecurityPin {
  private readonly code: string;

  static pattern = /^[0-9]{6}$/i;

  constructor(code: string) {
    if (!this.validate(code)) {
      throw new AuthError.Invalid6Digits('Invalid 6 digits code');
    }
    this.code = code;
  }

  private validate(code: string): boolean {
    return PhoneSecurityPin.pattern.test(code);
  }

  get value(): number {
    return parseInt(this.code);
  }
}
