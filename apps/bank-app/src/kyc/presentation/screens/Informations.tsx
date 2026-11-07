import { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { useCleanErrorOnFocus } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { Colors } from '../../../shared/presentation/constants';

import { FormRevenues, IRevenuesFormData } from './form-revenues';
import { fetchUpdateUser } from '../../../user/application/commands';
import { IKycStackPages } from 'apps/bank-app/src/shared/presentation/types';

const HEIGHT = Dimensions.get('window').height;

export const Informations = () => {
  /// translations
  const { t } = useTranslation();
  const { theme } = useTheme();

  // api call
  const dispatch = useDispatch();

  const { pending, error } = useSelector((state: IRootState) => state.user);

  const onSubmit = useCallback(
    (formData: IRevenuesFormData) => {
      dispatch(
        fetchUpdateUser({
          nextRoute: IKycStackPages.KYC,
          revenues: formData,
        }),
      );
    },
    [dispatch],
  );

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRevenuesFormData>();
  // clean domainError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.container.centeredItem]}>
          <View style={styles.textContainer}>
            <Text style={[theme.text.grey, { textAlign: 'left' }]}>{t('screens.kyc.revenues.intro')}</Text>
          </View>
          <FormRevenues
            control={control}
            errors={errors}
            error={domainError}
            onSubmit={handleSubmit(onSubmit)}
            onFocus={onFocus}
            loading={pending}
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
  textContainer: {
    width: '85%',
    justifyContent: 'center',
    marginTop: 30,
  },
});
