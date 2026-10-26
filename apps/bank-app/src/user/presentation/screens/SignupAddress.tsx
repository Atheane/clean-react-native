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
  SafeScrollingView,
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
    reset,
    watch,
    formState: { errors },
  } = useForm<ISignupAddressFormData>({
    defaultValues: {
      specifiedUSPerson: '0',
    },
  });

  const onSubmit = useCallback(
    (formData: ISignupAddressFormData) => {
      // sometimes google api does not find zip. In that case, it is given by user
      if (formData.address.zip === '') {
        formData.address.zip = formData.zip;
      }
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

  const addressValue = watch('address');

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <FormSignupAddress
            loading={pending}
            control={control}
            errors={errors}
            reset={reset}
            error={domainError}
            onSubmit={handleSubmit(onSubmit)}
            onFocus={onFocus}
            language={lang}
            address={addressValue}
          />
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bank.primary.white,
  },
});
