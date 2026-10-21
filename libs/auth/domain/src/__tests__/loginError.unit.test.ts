import { AuthError, IAuthErrorMessage, IAuthErrorCodes } from '../errors';

describe('LoginError - unit', () => {
  it('InvalidPassword should have the correct message and code if error as cause', () => {
    const cause = new Error('error');
    const error = new AuthError.InvalidPassword(cause);
    expect(error.message).toBe(IAuthErrorMessage.INVALID_PASSWORD);
    expect(error.code).toBe(IAuthErrorCodes.INVALID_PASSWORD);
    expect(error.cause).toBe(cause);
  });
  it('InvalidPassword should have the correct message and code if stirng message as cause', () => {
    const cause = 'error';
    const error = new AuthError.InvalidPassword(cause);
    expect(error.message).toBe(IAuthErrorMessage.INVALID_PASSWORD);
    expect(error.code).toBe(IAuthErrorCodes.INVALID_PASSWORD);
    expect(error.cause).toBe(cause);
  });
});
