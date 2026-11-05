import { IDomainError } from '@clean-rn/ddd';

import { IEnergyErrorCodes, IEnergyErrorMessage, Energy } from '@clean-rn/energy/domain';

export interface IEnergyState {
  pending: boolean;
  energy: Energy | null;
  error: IDomainError<IEnergyErrorCodes, IEnergyErrorMessage> | null;
}
