import { CardError } from '../errors';

export class CardPinCode {
  private readonly pin: string;

  // at least 6 numbers, and superieur to 100000
  static pattern = /^[0-9]{4,}$/i;

  constructor(pin: string) {
    if (!this.validate(pin)) {
      throw new CardError.InvalidPinFormat();
    }
    this.pin = pin;
  }

  private validate(pin: string): boolean {
    return CardPinCode.pattern.test(pin);
  }

  get value(): string {
    return this.pin;
  }
}
