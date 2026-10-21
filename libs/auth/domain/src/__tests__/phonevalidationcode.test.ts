import { AuthError } from '../errors';
import { PhoneOtp } from '../value-objects';

describe('PhoneOtp - unit', () => {
  it('should return throw a Invalid6Digits if code is not 6 digits', () => {
    const code = '4444';
    expect(() => new PhoneOtp(code)).toThrow(new AuthError.Invalid6Digits('Invalid 6 digits code'));
  });
});
