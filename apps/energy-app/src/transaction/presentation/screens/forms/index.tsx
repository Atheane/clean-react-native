import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { IDomainError } from '@clean-rn/ddd';
import { BIC, IBeneficiaryErrorCodes, IBeneficiaryErrorMessage, IBAN } from '@clean-rn/beneficiary/domain';

import {
  BankBuilding as BicIcon,
  Iban as IbanIcon,
  Colors,
  SubmitButton,
  TextInput,
  IbanInput,
} from '@clean-rn/ui-mobile';

import { ErrorMessage } from '../../../../shared/presentation/components/error-message';

export type IRibFormData = {
  iban: string;
  bic: string;
};

type IProps = {
  loading: boolean;
  control: Control<IRibFormData>;
  errors: FieldErrors<IRibFormData>;
  error: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage> | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export const FormRib = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container]}>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="iban"
          rules={{
            required: true,
            validate: (value) => IBAN.validate(value.replace(/\s/g, '')),
          }}
          render={({ field: { onChange, value } }) => (
            <IbanInput
              label={t('screens.transactions.IBAN.label')}
              labelColor={Colors.primary.grey}
              value={value}
              IconLeft={() => <IbanIcon style={{ marginRight: -32 }} />}
              placeholder={t('screens.transactions.IBAN.placeholder')}
              onChange={(text) => onChange(text.replace(/\s/g, ''))}
              onSubmitEditing={props.onSubmit}
            />
          )}
        />
      </View>
      {props.errors?.iban && props.errors.iban.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.IBAN.required'))}</Text>
        </View>
      )}
      {props.errors?.iban && props.errors.iban.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.IBAN.invalid'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="bic"
          rules={{
            required: true,
            validate: BIC.validate,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('screens.transactions.BIC.label')}
              labelColor={Colors.primary.grey}
              value={value}
              IconLeft={() => <BicIcon />}
              placeholder={t('screens.transactions.BIC.placeholder')}
              onChange={onChange}
              onSubmitEditing={props.onSubmit}
            />
          )}
        />
      </View>
      {props.errors?.bic && props.errors.bic.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.BIC.required'))}</Text>
        </View>
      )}
      {props.errors?.bic && props.errors.bic.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.BIC.invalid'))}</Text>
        </View>
      )}
      <View style={styles.domainErrorContainer}>
        <ErrorMessage
          error={props.error}
          errorMessage={t(`errors.domain-error.transactions.${props.error?.code}`)}
          genericErrorMessage={t('errors.other')}
        />
      </View>
      <View style={styles.formSubmit}>
        <SubmitButton
          title={t('button.add')}
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
    marginTop: 8,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  inputContainer: { marginTop: 4 },
  errorContainer: {
    marginTop: 0,
  },
  domainErrorContainer: {
    marginTop: 4,
    width: '90%',
  },
  formSubmit: {
    marginTop: 8,
  },
});
