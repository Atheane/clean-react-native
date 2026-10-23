import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { ICardErrorCodes, ICardErrorMessage, CardPinCode } from '@clean-rn/card/domain';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { DigitsInput } from '../../inputs/digits-input';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  initialValues?: IChangePinFormData;
  control: Control<IChangePinFormData>;
  errors: FieldErrors<IChangePinFormData>;
  error: IDomainError<ICardErrorCodes, ICardErrorMessage> | null;
  onFocus: () => void;
  text?: string;
};

export type IChangePinFormData = {
  code: string;
};

export const FormChangePin = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={theme.bank.container.centeredItem}>
        <Controller
          control={props.control}
          name="code"
          rules={{ required: true, pattern: CardPinCode.pattern, minLength: 4 }}
          render={({ field: { onChange, value } }) => {
            return (
              <DigitsInput
                value={value}
                onChange={onChange}
                onFocus={props.onFocus}
                numberDigits={4}
                defaultValue={props.initialValues?.code}
              />
            );
          }}
        />
      </View>
      {props.errors?.code && props.errors.code.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.card-pin.required'))}</Text>
        </View>
      )}
      {props.errors?.code && props.errors.code.type === 'pattern' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.card-pin.invalid'))}</Text>
          <Text style={theme.bank.text.errors}>{props.errors.code.ref?.value}</Text>
        </View>
      )}
      {props.errors?.code && props.errors.code.type === 'minLength' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.card-pin.min-length'))}</Text>
        </View>
      )}
      <View style={styles.domainErrorContainer}>
        <ErrorMessage error={props.error} />
      </View>
      <View style={styles.textContainer}>
        <Text style={theme.bank.text.grey}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  errorContainer: {
    marginTop: 24,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
  textContainer: {
    marginTop: 24,
  },
});
