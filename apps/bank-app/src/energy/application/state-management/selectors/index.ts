import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectEnergy = (state: IRootState) => state.energy.energy;
