import { useCallback } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { useTheme } from '@rneui/themed';

import { Phone } from '@clean-rn/contact/domain';
import { useCleanErrorOnFocus, Shield } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { fetchSearchPhone } from '../../application/commands';
import { ISignupPhoneFormData, FormSignupPhone } from '../forms';

import { Colors } from '../../../shared/presentation/constants';

const locales = getLocales();

const HEIGHT = Dimensions.get('window').height;

export const SignupPhone = () => {
  // translations
  const { t } = useTranslation();
  // css theme
  const { theme } = useTheme();

  // internal state
  const defaultCountry = locales[0]?.regionCode || undefined;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupPhoneFormData>({
    defaultValues: {
      countryCode: defaultCountry,
      phone: undefined,
    },
  });

  // api call
  const dispatch = useDispatch();

  const { pending, error } = useSelector((state: IRootState) => state.user);

  const onSubmit = useCallback(
    (formData: ISignupPhoneFormData) => {
      try {
        dispatch(fetchSearchPhone({ phone: new Phone(formData.phone, formData.countryCode) }));
      } catch (e: unknown) {
        dispatch(showUnknownError(e as Error));
      }
    },
    [dispatch],
  );

  // clean domainError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView fixedHeight>
        <View style={[styles.container, theme.container.centeredItem]}>
          <View style={styles.iconContainer}>
            <Shield width={150} height={150} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[theme.text.darkBlue, styles.text]}>{t('screens.signup-phone.text')}</Text>
          </View>
          <FormSignupPhone
            defaultCountry={defaultCountry}
            loading={pending}
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
    height: HEIGHT,
    backgroundColor: Colors.primary.white,
  },
  iconContainer: {
    marginTop: 50,
  },
  textContainer: {
    marginTop: 50,
    width: '75%',
  },
  text: {
    textAlign: 'center',
  },
});
