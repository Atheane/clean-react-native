import { Amount } from '../value-objects';

export type ISendTransferCommand = {
  accountId: number;
  beneficiaryId: number;
  amount: Amount;
  label: string;
};
