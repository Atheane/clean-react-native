import { AuthError } from '../errors';
import { Email } from '../value-objects';

describe('EmailVO - unit', () => {
  it('should return throw a LoginError if email is invalid', () => {
    const email = 'test@test';
    expect(() => new Email(email)).toThrow(new AuthError.InvalidEmail('Invalid email'));
  });
});
