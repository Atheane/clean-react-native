import { AuthError } from '@auth/domain/errors';

export class Email {
  private readonly email: string;

  static pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  constructor(email: string) {
    if (!this.validate(email)) {
      throw new AuthError.InvalidEmail('Invalid email');
    }
    this.email = email;
  }

  private validate(email: string): boolean {
    return Email.pattern.test(email);
  }

  get value(): string {
    return this.email.toLowerCase();
  }
}
