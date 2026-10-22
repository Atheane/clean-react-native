import { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

import { useCleanErrorOnFocus, FormCardLimits, ICardLimitsFormData } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

const HEIGHT = Dimensions.get('screen').height;
export const CardLimits = () => {
  const { t } = useTranslation();

  // api call
  const { pending, error } = useSelector((state: IRootState) => state.beneficiary.beneficiaries);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICardLimitsFormData>({
    defaultValues: {},
  });

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: ICardLimitsFormData) => {
      // dispatch(changeCardLimits(formData));
    },
    [dispatch],
  );

  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <FormCardLimits
            loading={pending}
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
    justifyContent: 'flex-start',
  },
  iconContainer: {
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginTop: 50,
  },
});
