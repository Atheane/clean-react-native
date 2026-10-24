import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { GreenGradientSpeedLimit } from '../../../assets';
import { Colors, FontNames } from '../../../constants';

import { SubmitButton } from '../../buttons/submit-button';
import { TextInput } from '../../inputs/text-input';

export type ICardLimitsFormData = {
  limitPaymentMonth?: string;
  limitPaymentWeek?: string;
  limitPaymentDay?: string;
};

type IProps = {
  initialValues: ICardLimitsFormData;
  loading: boolean;
  control: Control<ICardLimitsFormData>;
  errors: FieldErrors<ICardLimitsFormData>;
  onSubmit: () => void;
};

export const FormCardLimits = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, theme.bank.container.centeredItem]}>
      <View style={styles.textContainer}>
        <Text style={styles.instructionText}>{t('screens.card.limits.instruction-top')}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="limitPaymentDay"
          rules={{
            min: 100,
            max: 3000,
          }}
          defaultValue={props.initialValues.limitPaymentDay}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              numeric
              label={t('screens.card.limits.day-limit')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              IconLeft={GreenGradientSpeedLimit}
              placeholder={'2000'}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </View>
      {props.errors?.limitPaymentDay && props.errors.limitPaymentDay.type === 'min' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.card-limits.min'))}</Text>
        </View>
      )}
      {props.errors?.limitPaymentDay && props.errors.limitPaymentDay.type === 'max' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.card-limits.max.day'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="limitPaymentWeek"
          rules={{
            min: 100,
            max: 6000,
          }}
          defaultValue={props.initialValues.limitPaymentWeek}
          render={({ field: { onChange, value } }) => (
            <TextInput
              numeric
              label={t('screens.card.limits.week-limit')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              IconLeft={GreenGradientSpeedLimit}
              placeholder={'5000'}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.limitPaymentWeek && props.errors.limitPaymentWeek.type === 'min' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.card-limits.min'))}</Text>
        </View>
      )}
      {props.errors?.limitPaymentWeek && props.errors.limitPaymentWeek.type === 'max' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>
            {firstLetterCapitalize(t('errors.card-limits.max.week'))}
          </Text>
        </View>
      )}
      <View style={(styles.inputContainer, { marginTop: 40, marginBottom: 16 })}>
        <Controller
          control={props.control}
          name="limitPaymentMonth"
          rules={{
            min: 100,
            max: 9000,
          }}
          defaultValue={props.initialValues.limitPaymentMonth}
          render={({ field: { onChange, value } }) => (
            <TextInput
              numeric
              label={t('screens.card.limits.month-limit')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              IconLeft={GreenGradientSpeedLimit}
              placeholder={'8000'}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.limitPaymentMonth && props.errors.limitPaymentMonth.type === 'min' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.card-limits.min'))}</Text>
        </View>
      )}
      {props.errors?.limitPaymentMonth && props.errors.limitPaymentMonth.type === 'max' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>
            {firstLetterCapitalize(t('errors.card-limits.max.month'))}
          </Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.instructionText}>{t('screens.card.limits.instruction-bottom')}</Text>
      </View>
      <View style={styles.formSubmit}>
        <SubmitButton
          title={t('button.submit')}
          uppercase={false}
          onSubmit={props.onSubmit}
          loading={props.loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  inputContainer: { marginTop: 40 },
  errorContainer: {
    marginTop: 24,
  },
  domainErrorContainer: {
    marginTop: 24,
  },
  formSubmit: {
    marginTop: '10%',
  },
  textContainer: {
    alignItems: 'center',
    width: '75%',
    marginTop: 16,
  },
  instructionText: {
    width: 290,
    fontSize: 14,
    lineHeight: 30,
    textAlign: 'left',
    fontFamily: FontNames.MartelSans_400Regular,
    color: Colors.bank.primary.darkGrey,
  },
});
