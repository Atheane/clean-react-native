import { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

import { FormCardLimits, ICardLimitsFormData } from '@clean-rn/ui-mobile';

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
  } = useForm<ICardLimitsFormData>({
    defaultValues: {},
  });

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: ICardLimitsFormData) => {
      if (!card) return;
      dispatch(
        fetchChangeCardLimits({
          card,
          limits: {
            day: formData.limitPaymentDay,
            week: formData.limitPaymentWeek,
            month: formData.limitPaymentMonth,
          },
        }),
      );
    },
    [dispatch, card],
  );

  console.log('--------- > card?.id', card?.id);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <FormCardLimits
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
