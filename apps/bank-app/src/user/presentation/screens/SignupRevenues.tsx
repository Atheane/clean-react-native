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

import { FormSignupRevenues, ISignupRevenuesFormData } from '../forms';
import { registerRevenues } from '../../application/commands';

const HEIGHT = Dimensions.get('window').height;

export const SignupRevenues = () => {
  /// translations
  const { t } = useTranslation();
  const { theme } = useTheme();

  // api call
  const dispatch = useDispatch();

  const { error } = useSelector((state: IRootState) => state.user);

  const onSubmit = useCallback(
    (formData: ISignupRevenuesFormData) => {
      dispatch(registerRevenues(formData));
    },
    [dispatch],
  );

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupRevenuesFormData>();
  // clean domainError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.container.centeredItem]}>
          <View style={styles.textContainer}>
            <Text style={[theme.text.grey, { textAlign: 'left' }]}>{t('screens.signup-revenues.intro')}</Text>
          </View>
          <FormSignupRevenues
            control={control}
            errors={errors}
            error={domainError}
            onSubmit={handleSubmit(onSubmit)}
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
  textContainer: {
    width: '85%',
    justifyContent: 'center',
    marginTop: 30,
  },
});
