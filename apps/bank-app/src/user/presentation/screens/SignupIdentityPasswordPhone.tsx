import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { useTheme } from '@rneui/themed';

import { Email } from '@clean-rn/auth/domain';
import { Phone } from '@clean-rn/contact/domain';
import { IGender, IRegisterIdentityCommand } from '@clean-rn/user/domain';
import { useCleanErrorOnFocus, useSecure } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { registerIdentity, fetchSearchPhone, registerPassword } from '../../application/commands';
import { FormSignupIdentityPasswordPhone, ISignupIdentityPasswordPhoneFormData } from '../forms';

import { Colors } from '../../../shared/presentation/constants';

const locales = getLocales();

const HEIGHT = Dimensions.get('window').height;

export const SignupIdentityPasswordPhone = () => {
  /// translations
  const { t } = useTranslation();
  const { theme } = useTheme();

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

  const { pending, error, email } = useSelector((state: IRootState) => state.user);

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
        <View style={[styles.container, theme.container.centeredItem]}>
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
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT * 1.1,
    backgroundColor: Colors.primary.white,
  },
});
