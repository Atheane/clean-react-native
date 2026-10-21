import { BeneficiaryError } from '../errors';
import * as ibantools from 'ibantools';

export class IBAN {
  private readonly iban: string;

  constructor(ibanString: string) {
    if (!IBAN.validate(ibanString)) {
      throw new BeneficiaryError.InvalidIBAN('Invalid IBAN');
    }
    this.iban = ibanString;
  }

  static validate(ibanString: string): boolean {
    console.log('VALIDATE IABN', ibanString, ibantools.isValidIBAN(ibanString));
    return ibantools.isValidIBAN(ibanString);
  }

  get value(): string {
    return this.iban;
  }
}
