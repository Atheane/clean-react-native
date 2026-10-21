import { BeneficiaryError } from '../errors';
import * as ibantools from 'ibantools';

export class Bic {
  private readonly bic: string;

  constructor(bicString: string) {
    if (!Bic.validate(bicString)) {
      throw new BeneficiaryError.InvalidBic('Invalid BIC');
    }
    this.bic = bicString;
  }

  static validate(bicString: string): boolean {
    console.log('Validate BIC');
    return ibantools.isValidBIC(bicString);
  }

  get value(): string {
    return this.bic;
  }
}
