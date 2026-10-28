import { ModalError } from '@clean-rn/ui-mobile';

import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export const ScreenModalError = () => {
  const {
    params: { error },
  } = useRoute() as { params: { error: Error } };
  const { t } = useTranslation();
  return error ? (
    <ModalError
      error={error}
      errorCode={t('modal-error.code')}
      errorDetails={t('modal-error.details')}
      errorStack={t('modal-error.stack')}
      genericMessage={t('errors.other')}
    />
  ) : null;
};
