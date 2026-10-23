import { Phone } from '@clean-rn/contact/domain';
import { Amount } from '../value-objects';

export type IPayoutCommand = {
  accountId: number;
  beneficiaryId: number;
  amount: Amount;
  label: string;
};
export type ITransferCommand = {
  accountId: number;
  beneficiaryAccountId: number;
  amount: Amount;
  label: string;
};

export type ITransactionWaitingCommand = {
  accountId: number;
  phone: Phone;
  amount: Amount;
  label: string;
};
