import { AccountError } from '../errors';
import * as ibantools from 'ibantools';

export class Iban {
  private readonly iban: string;

  constructor(ibanString: string) {
    if (!this.validate(ibanString)) {
      throw new AccountError.InvalidIban('Invalid IBAN');
    }
    this.iban = ibanString;
  }

  private validate(ibanString: string): boolean {
    return ibantools.isValidIBAN(ibanString);
  }

  get value(): string {
    return this.iban;
  }
}
