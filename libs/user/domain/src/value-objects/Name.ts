import { UserError } from '../errors';

export class Name {
  private readonly name: string;

  constructor(name: string) {
    if (!Name.validate(name)) {
      throw new UserError.InvalidName(
        "Must match ^([a-zA-ZÀ-ÖØ-öø-ÿs]+?)([-s'][a-zA-ZÀ-ÖØ-öø-ÿs]+)*? pattern",
      );
    }
    this.name = name;
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
