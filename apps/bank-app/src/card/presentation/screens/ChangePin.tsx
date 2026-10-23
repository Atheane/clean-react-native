import { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { FormChangePin, IChangePinFormData, useCleanErrorOnFocus, SubmitButton } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const HEIGHT = Dimensions.get('screen').height;
export const ChangePin = () => {
  const { t } = useTranslation();

  // api call
  const { card, pending, error } = useSelector((state: IRootState) => state.card);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePinFormData>({
    defaultValues: {
      code: card?.properties?.pin?.value,
    },
  });

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: IChangePinFormData) => {
      // dispatch(
      //   fetchChangePin({
      //     pin: formData.code,
      //   }),
      // );
    },
    [dispatch],
  );

  const { theme } = useTheme();

  // clean serverError onFocus
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container]}>
          <View style={[theme.bank.container.centeredItem, styles.textContainer, { marginTop: 50 }]}>
            <Text style={[theme.bank.text.grey, styles.text]}>
              {t('screens.card.change-pin.instruction-top')}
            </Text>
          </View>
          <View style={styles.formContainer}>
            <FormChangePin
              initialValues={card?.properties?.pin?.value ? { code: card.properties.pin.value } : undefined}
              control={control}
              errors={errors}
              error={domainError}
              onFocus={onFocus}
            />
          </View>

          <View style={[theme.bank.container.centeredItem, styles.textContainer]}>
            <Text style={[theme.bank.text.grey, styles.text]}>
              {t('screens.card.change-pin.instruction-bottom-static')}
            </Text>
          </View>
          <View style={[theme.bank.container.centeredItem, styles.textContainer, { marginTop: 50 }]}>
            <Text style={[theme.bank.text.grey, styles.text]}>
              {card?.properties?.pinChange + ' ' + t('screens.card.change-pin.instruction-bottom-dynamic')}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <SubmitButton
              title={t('button.submit')}
              uppercase={false}
              onSubmit={handleSubmit(onSubmit)}
              loading={pending}
            />
          </View>
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
    alignItem: 'center',
  },
  textContainer: { width: '85%', marginHorizontal: '7.5%' },
  text: { textAlign: 'center', fontSize: 16 },
  formContainer: { height: HEIGHT * 0.15, marginTop: 50 },
  buttonContainer: {
    justifyContent: 'center',
    marginTop: 150,
    marginHorizontal: '12.5%',
  },
});
