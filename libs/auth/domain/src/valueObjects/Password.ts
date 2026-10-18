import { AuthError } from '../errors';

export class Password {
  private readonly password: string;

  constructor(password: string) {
    if (!this.validate(password)) {
      throw new AuthError.InvalidPassword();
    }
    this.password = password;
  }

  private validate(password: string): boolean {
    if (!password || password.length !== 6) {
      return false;
    }
    return true;
  }

  get value(): string {
    return this.password;
  }
}
