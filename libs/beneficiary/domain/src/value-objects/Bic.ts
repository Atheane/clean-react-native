import { AccountError } from '../errors';
import BIC from 'bic';

export class Bic {
  private readonly bic: string;

  constructor(bicString: string) {
    if (!this.validate(bicString)) {
      throw new AccountError.InvalidBic('Invalid BIC');
    }
    this.bic = bicString;
  }

  private validate(bicString: string): boolean {
    return BIC.isValid(bicString);
  }

  get value(): string {
    return this.bic;
  }
}
