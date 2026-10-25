import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useTheme } from '@rneui/themed';
import { getLocales } from 'expo-localization';

import {
  useCleanErrorOnFocus,
  FormSignupAddress,
  ISignupAddressFormData,
  Colors,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary } from '../../../shared/presentation/hoc';

import { registerAddress } from '../../application/commands';

const lang = getLocales()[0]?.languageCode || 'FR';
export const SignupAddress = () => {
  /// translations
  const { t } = useTranslation();
  const { theme } = useTheme();

  // api call
  const dispatch = useDispatch();
  const { pending, error } = useSelector((state: IRootState) => state.user);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupAddressFormData>();

  const onSubmit = useCallback(
    (formData: ISignupAddressFormData) => {
      dispatch(
        registerAddress({
          ...formData,
          USPerson: formData.specifiedUSPerson === '1',
        }),
      );
    },
    [dispatch],
  );

  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <View style={[styles.container, theme.bank.container.centeredItem]}>
        <FormSignupAddress
          loading={pending}
          control={control}
          errors={errors}
          error={domainError}
          onSubmit={handleSubmit(onSubmit)}
          onFocus={onFocus}
          language={lang}
        />
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bank.primary.white,
  },
});
