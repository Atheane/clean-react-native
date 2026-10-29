import { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

import { FormCardLimits, ICardLimitsFormData } from '../forms';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { fetchChangeCardLimits } from '../../application/commands';

const HEIGHT = Dimensions.get('screen').height;
export const CardLimits = () => {
  const { t } = useTranslation();

  // api call
  const { pending, card } = useSelector((state: IRootState) => state.card);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICardLimitsFormData>();

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: ICardLimitsFormData) => {
      dispatch(
        fetchChangeCardLimits({
          limits: {
            day: formData.limitPaymentDay ? parseInt(formData.limitPaymentDay) : undefined,
            week: formData.limitPaymentWeek ? parseInt(formData.limitPaymentWeek) : undefined,
            month: formData.limitPaymentMonth ? parseInt(formData.limitPaymentMonth) : undefined,
          },
        }),
      );
    },
    [dispatch],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <FormCardLimits
            initialValues={{
              limitPaymentDay: card?.properties?.limits?.day?.toString(),
              limitPaymentWeek: card?.properties?.limits?.week?.toString(),
              limitPaymentMonth: card?.properties?.limits?.month?.toString(),
            }}
            loading={pending}
            control={control}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)}
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
