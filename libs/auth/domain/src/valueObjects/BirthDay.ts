import dayjs, { Dayjs } from 'dayjs';
import { AuthError } from '@auth/domain/errors';

export class BirthDay {
  private readonly birthday: Dayjs;

  constructor(birthday: Dayjs) {
    if (!this.validate(birthday)) {
      throw new AuthError.InvalidBirthday('Minimum 18 years old');
    }
    this.birthday = birthday;
  }

  private validate(birthday: Dayjs): boolean {
    const today = dayjs(new Date());
    return !(today.diff(birthday, 'year') < 18);
  }

  get value(): string {
    return this.birthday.format('YYYY-MM-DD');
  }
}
