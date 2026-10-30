import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

export const selectHouse = (state: IRootState) => state.footprint.house;
