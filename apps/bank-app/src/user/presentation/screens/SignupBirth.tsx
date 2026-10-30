import { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useTheme } from '@rneui/themed';

import { useCleanErrorOnFocus } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { Colors } from '../../../shared/presentation/constants';

import { registerBirth } from '../../application/commands';
import { FormSignupBirth, ISignupBirthFormData } from '../forms';

const HEIGHT = Dimensions.get('window').height;

export const SignupBirth = () => {
  /// translations
  const { t } = useTranslation();
  const { theme } = useTheme();

  // api call
  const dispatch = useDispatch();

  const { user, error } = useSelector((state: IRootState) => state.user);
  const onSubmit = useCallback(
    (formData: ISignupBirthFormData) => {
      dispatch(registerBirth(formData));
    },
    [dispatch],
  );

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupBirthFormData>({
    defaultValues: {
      birthday: dayjs('1980-01-01'),
      birthCountry: user?.properties.phone?.countryCode,
      nationality: user?.properties.phone?.countryCode,
    },
  });
  // clean domainError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.container.centeredItem]}>
          <FormSignupBirth
            control={control}
            errors={errors}
            error={domainError}
            onSubmit={handleSubmit(onSubmit)}
            onFocus={onFocus}
            defaultCountry={user?.properties.phone?.countryCode}
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
});
