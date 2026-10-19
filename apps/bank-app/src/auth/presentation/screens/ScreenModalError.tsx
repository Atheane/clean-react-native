import { ModalError } from '@clean-rn/ui-mobile';
import { useSelector } from 'react-redux';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

export const ScreenModalError = () => {
  const { error } = useSelector((state: IRootState) => state.unknownError);
  return error ? <ModalError error={error} /> : null;
};
