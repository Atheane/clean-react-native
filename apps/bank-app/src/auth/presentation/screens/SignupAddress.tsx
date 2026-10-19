import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { useCleanErrorOnFocus, FormSignupAddress, ISignupAddressFormData } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { registerAddress } from '../../application/commands/signup';

export const SignupAddress = () => {
  /// translations
  const { t } = useTranslation();

  // api call
  const dispatch = useDispatch();
  const { pending, error, user } = useSelector((state: IRootState) => state.auth.signup);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupAddressFormData>({
    defaultValues: {
      specifiedUSPerson: '0',
      country: user?.properties.phone?.countryCode,
    },
  });

  const onSubmit = useCallback(
    (formData: ISignupAddressFormData) => {
      try {
        dispatch(
          registerAddress({
            ...formData,
            str: formData.street,
            USPerson: formData.specifiedUSPerson === '1',
          }),
        );
      } catch (e: unknown) {
        dispatch(showUnknownError(e as Error));
      }
    },
    [dispatch],
  );

  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <FormSignupAddress
          loading={pending}
          control={control}
          errors={errors}
          error={domainError}
          defaultCountry={user?.properties.phone?.countryCode}
          onSubmit={handleSubmit(onSubmit)}
          onFocus={onFocus}
        />
      </SafeScrollingView>
    </ErrorBoundary>
  );
};
