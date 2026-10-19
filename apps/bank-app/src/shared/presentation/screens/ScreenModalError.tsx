import { ModalError } from '@clean-rn/ui-mobile';

import { useRoute } from '@react-navigation/native';

export const ScreenModalError = () => {
  const {
    params: { error },
  } = useRoute() as { params: { error: Error } };
  return error ? <ModalError error={error} /> : null;
};
