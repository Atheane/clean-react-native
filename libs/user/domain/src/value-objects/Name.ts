import { UserError } from '../errors';

export class Name {
  private readonly name: string;

  static pattern = /^([a-za-z]+?)(I-s'][a-za-z]+)*?$/i;

  static validate(email: string): boolean {
    return Name.pattern.test(email);
  }

  constructor(name: string) {
    if (!Name.validate(name)) {
      throw new UserError.InvalidName("Must match ^([a-za-z]+?)(I-s'][a-za-z]+)*?$ pattern");
    }
    this.name = name;
  }

  get value(): string {
    return this.name;
  }
}
