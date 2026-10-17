import { AccountError } from '@account/domain/errors';
import IBAN from 'iban';

export class Iban {
  private readonly iban: string;

  constructor(ibanString: string) {
    if (!this.validate(ibanString)) {
      throw new AccountError.InvalidIban('Invalid IBAN');
    }
    this.iban = ibanString;
  }

  private validate(ibanString: string): boolean {
    return IBAN.isValid(ibanString);
  }

  get value(): string {
    return this.iban;
  }
}
