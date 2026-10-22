import { BeneficiaryError } from '../errors';

export class LastName {
  private readonly name: string;

  constructor(nameString: string) {
    if (!LastName.validate(nameString)) {
      throw new BeneficiaryError.InvalidName('Invalid Name format: provide lastName only');
    }
    this.name = nameString;
  }

  static validate(nameString: string): boolean {
    // [a-zA-Z-] : autorise les lettres majuscules et minuscules
    // todo: autoriser espace et - pour les noms composés, dès que c'est fait côté back
    const regex = /^[a-zA-Z]+$/;
    return regex.test(nameString);
  }

  get value(): string {
    return this.name;
  }
}
