import dayjs from 'dayjs';

import { AuthError } from '../errors';
import { BirthDay } from '../value-objects';

describe('BirthDayVO - unit', () => {
  it('should return throw a AuthError.InvalidBirthday if age under 18 years old', () => {
    const birthday = '06/10/2020';
    expect(() => new BirthDay(dayjs(birthday))).toThrow(
      new AuthError.InvalidBirthday('Minimum 18 years old'),
    );
  });
});
