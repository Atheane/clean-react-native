import { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { CardPinCode } from '@clean-rn/card/domain';

import { useCleanErrorOnFocus, SubmitButton } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { Colors } from '../../../shared/presentation/constants';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { fetchChangePIN } from '../../../card/application/commands';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { FormChangePin, IChangePinFormData } from '../forms';

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
    watch,
  } = useForm<IChangePinFormData>();

  const dispatch = useDispatch();

  const codeValue = watch('code');
  const isCodeValid = codeValue?.length === 4;

  const onSubmit = useCallback(
    (formData: IChangePinFormData) => {
      try {
        dispatch(
          fetchChangePIN({
            pin: new CardPinCode(formData.code),
          }),
        );
      } catch (e: unknown) {
        dispatch(showUnknownError(e as Error));
      }
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
          <View style={[theme.container.centeredItem, styles.textContainer, { marginTop: 100 }]}>
            <Text style={[theme.text.grey, styles.text]}>{t('screens.card.change-pin.instruction-top')}</Text>
          </View>
          <View style={styles.formContainer}>
            <FormChangePin control={control} errors={errors} error={domainError} onFocus={onFocus} />
          </View>
          <View style={[theme.container.centeredItem, styles.textContainer]}>
            <Text style={[theme.text.grey, styles.text]}>
              {t('screens.card.change-pin.instruction-bottom-static')}
            </Text>
          </View>
          <View style={[theme.container.centeredItem, styles.textContainer, { marginTop: 50 }]}>
            <Text
              style={[
                theme.text.grey,
                styles.text,
                (card?.properties?.pinChange === undefined || card?.properties?.pinChange === 3) && {
                  color: Colors.secondary.salmon,
                },
              ]}
            >
              {(card?.properties?.pinChange ?? '3') +
                ' ' +
                t('screens.card.change-pin.instruction-bottom-dynamic')}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <SubmitButton
              title={t('button.submit')}
              uppercase={false}
              onSubmit={handleSubmit(onSubmit)}
              loading={pending}
              disabled={!isCodeValid}
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
    marginTop: 80,
    marginHorizontal: '12.5%',
  },
});
