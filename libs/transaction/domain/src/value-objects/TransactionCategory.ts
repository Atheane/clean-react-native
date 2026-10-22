import { TransactionError } from '../errors';
import { ITransactionCategory, ITransactionType } from '../types';

export class TransactionCategory {
  private readonly mcc?: number;
  private readonly transactionType: ITransactionType;

  constructor(transactionType: ITransactionType, mcc?: number) {
    this.validate(transactionType);
    if (mcc) this.mcc = mcc;
    this.transactionType = transactionType;
  }

  private validate(transactionType: ITransactionType): void {
    if (!ITransactionType[transactionType]) {
      throw new TransactionError.UnknownTransactionType();
    }
  }

  get value(): ITransactionCategory {
    if (this.mcc && [6010, 6011, 6012, 6013, 6019].includes(this.mcc)) {
      return ITransactionCategory.BANK;
    } else if (this.mcc === 5813) {
      return ITransactionCategory.BAR;
    } else if (this.mcc === 8398) {
      return ITransactionCategory.ENDOWMENT;
    } else if (this.mcc && [6300, 6381, 6399].includes(this.mcc)) {
      return ITransactionCategory.ASSURANCES;
    } else if (
      this.mcc &&
      ([5733, 5734, 5945, 5972, 7841, 7932, 7933].includes(this.mcc) ||
        (this.mcc >= 7991 && this.mcc <= 7999))
    ) {
      return ITransactionCategory.LEISURE;
    } else if (this.mcc && [5970, 5971, 7911, 7922, 7929].includes(this.mcc)) {
      return ITransactionCategory.ART;
    } else if (this.mcc === 8111) {
      return ITransactionCategory.LEGAL;
    } else if (this.mcc && ([5996, 6513].includes(this.mcc) || (this.mcc >= 5712 && this.mcc <= 5722))) {
      return ITransactionCategory.HOUSING;
    } else if (
      (this.mcc && this.mcc >= 4000 && this.mcc <= 4799 && this.mcc !== 4722) ||
      this.mcc === 7512 ||
      this.mcc === 7523
    ) {
      return ITransactionCategory.TRANSPORT;
    } else if (this.mcc && [5732, 7372, 7375, 7379, 7622].includes(this.mcc)) {
      return ITransactionCategory.HIGHT_TECH;
    } else if (this.mcc === 5969) {
      return ITransactionCategory.SUBSCRIPTIONS;
    } else if (this.mcc === 4722) {
      return ITransactionCategory.TRAVEL;
    } else if (
      this.mcc &&
      ((this.mcc >= 5511 && this.mcc <= 5533) ||
        (this.mcc >= 5551 && this.mcc <= 5599) ||
        (this.mcc >= 7512 && this.mcc <= 7549))
    ) {
      return ITransactionCategory.VEHICLES;
    } else if (this.mcc === 5921) {
      return ITransactionCategory.ALCOHOL;
    } else if (
      this.mcc &&
      [
        5047, 5122, 5912, 5499, 5976, 8011, 8021, 8031, 8041, 8042, 8043, 8044, 8049, 8050, 8062, 8071, 8099,
      ].includes(this.mcc)
    ) {
      return ITransactionCategory.HEALTH;
    } else if (this.mcc === 8211) {
      return ITransactionCategory.SCHOOLING;
    } else if (this.mcc === 5812 || this.mcc === 5814) {
      return ITransactionCategory.RESTAURANTS;
    } else if (this.mcc && [5541, 5542, 5983].includes(this.mcc)) {
      return ITransactionCategory.FUEL;
    } else if (this.mcc && [5411, 5422, 5441, 5451, 5462, 5499].includes(this.mcc)) {
      return ITransactionCategory.NUTRITION;
    } else if (this.mcc && this.mcc >= 5815 && this.mcc <= 5818) {
      return ITransactionCategory.NUMERIC;
    } else if (
      this.mcc &&
      ([5137, 5139, 5948].includes(this.mcc) || (this.mcc >= 5611 && this.mcc <= 5699))
    ) {
      return ITransactionCategory.CLOTHING;
    } else if (this.mcc && [5192, 5942, 5946, 7829, 7832].includes(this.mcc)) {
      return ITransactionCategory.CULTURE;
    } else if (this.mcc === 8092) {
      return ITransactionCategory.NURSING;
    } else if (this.mcc === 7399) {
      return ITransactionCategory.PRO;
    }
    if (
      [
        ITransactionType.PAYIN,
        ITransactionType.PAYOUT,
        ITransactionType.TRANSFER_IN,
        ITransactionType.TRANSFER_OUT,
      ].includes(this.transactionType)
    ) {
      return ITransactionCategory.PROCUREMENT;
    }
    return ITransactionCategory.DIVERSE;
  }
}
