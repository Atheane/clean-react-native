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
    const regex = new RegExp(/^([a-zA-ZÀ-ÖØ-öø-ÿ\s]+?)([-s'][a-zA-ZÀ-ÖØ-öø-ÿ\s]+)*?$/);
    return regex.test(nameString);
  }

  get value(): string {
    return this.name;
  }
}
