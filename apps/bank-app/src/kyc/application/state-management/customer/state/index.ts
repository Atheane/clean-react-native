import { IDocument } from '@clean-rn/kyc/domain';

export interface IKycState {
  pending: boolean;
  documents: IDocument[] | [];
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}
