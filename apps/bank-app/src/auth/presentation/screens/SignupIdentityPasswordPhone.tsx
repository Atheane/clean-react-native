import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';

import { Email, IGender, IRegisterIdentityCommand, Phone } from '@clean-rn/auth/domain';
import {
  useCleanErrorOnFocus,
  FormSignupIdentityPasswordPhone,
  ISignupIdentityPasswordPhoneFormData,
  useSecure,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { registerIdentity, fetchSearchPhone, registerPassword } from '../../application/commands/signup';

const locales = getLocales();

export const SignupIdentityPasswordPhone = () => {
  /// translations
  const { t } = useTranslation();

  // internal state
  const defaultCountry = locales[0]?.regionCode || undefined;
  const { secured, onToggleSecurity } = useSecure(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupIdentityPasswordPhoneFormData>({
    defaultValues: {
      title: IGender.MAN,
      firstName: '',
      lastName: '',
      countryCode: defaultCountry,
      phone: undefined,
    },
  });

  // api call
  const dispatch = useDispatch();

  const { pending, error, email } = useSelector((state: IRootState) => state.auth.signup);

  const onSubmit = useCallback(
    (formData: ISignupIdentityPasswordPhoneFormData) => {
      try {
        dispatch(
          registerIdentity({
            gender: formData.title,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email,
          } as IRegisterIdentityCommand & { email: Email }),
        );
        dispatch(registerPassword({ password: formData.password }));
        dispatch(fetchSearchPhone({ phone: new Phone(formData.phone, formData.countryCode) }));
      } catch (e: unknown) {
        dispatch(showUnknownError(e as Error));
      }
    },
    [dispatch, email],
  );

  // clean domainError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <FormSignupIdentityPasswordPhone
          defaultCountry={defaultCountry}
          loading={pending}
          securedPassword={secured}
          onToggleSecurityPassword={onToggleSecurity}
          control={control}
          errors={errors}
          onSubmit={handleSubmit(onSubmit)}
          error={domainError}
          onFocus={onFocus}
        />
      </SafeScrollingView>
    </ErrorBoundary>
  );
};
