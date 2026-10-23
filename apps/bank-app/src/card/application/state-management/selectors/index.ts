import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';

export const selectCard = (state: IRootState) => state.card.card;
