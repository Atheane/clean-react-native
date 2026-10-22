import { BeneficiaryError } from '../errors';
import * as ibantools from 'ibantools';

export class BIC {
  private readonly bic: string;

  constructor(bicString: string) {
    if (!BIC.validate(bicString)) {
      throw new BeneficiaryError.InvalidBIC('Invalid BIC');
    }
    this.bic = bicString;
  }

  static validate(bicString: string): boolean {
    return ibantools.isValidBIC(bicString);
  }

  get value(): string {
    return this.bic;
  }
}
