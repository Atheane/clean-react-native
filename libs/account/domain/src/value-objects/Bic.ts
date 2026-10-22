import { AccountError } from '../errors';
import * as ibantools from 'ibantools';

export class Bic {
  private readonly bic: string;

  constructor(bicString: string) {
    if (!this.validate(bicString)) {
      throw new AccountError.InvalidBic('Invalid BIC');
    }
    this.bic = bicString;
  }

  private validate(bicString: string): boolean {
    return ibantools.isValidBIC(bicString);
  }

  get value(): string {
    return this.bic;
  }
}
