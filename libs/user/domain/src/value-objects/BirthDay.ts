import dayjs, { Dayjs } from 'dayjs';
import { UserError } from '../errors';

export class BirthDay {
  private readonly birthday: Dayjs;

  static validate(birthday: Dayjs): boolean {
    const today = dayjs(new Date());
    return !(today.diff(birthday, 'year') < 18);
  }

  constructor(birthday: Dayjs) {
    if (!BirthDay.validate(birthday)) {
      throw new UserError.InvalidBirthday('Minimum 18 years old');
    }
    this.birthday = birthday;
  }

  get value(): string {
    return this.birthday.format('YYYY-MM-DD');
  }
}
