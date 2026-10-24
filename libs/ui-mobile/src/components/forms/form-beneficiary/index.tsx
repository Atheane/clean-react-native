import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { firstLetterCapitalize } from '@clean-rn/utils';

import { IDomainError } from '@clean-rn/ddd';
import {
  BIC,
  IBeneficiaryErrorCodes,
  IBeneficiaryErrorMessage,
  IBAN,
  LastName,
} from '@clean-rn/beneficiary/domain';

import { ProfileGradient, BicGreenGradient, IbanGreenGradient } from '../../../assets';
import { Colors } from '../../../constants';

import { SubmitButton } from '../../buttons/submit-button';
import { TextInput } from '../../inputs/text-input';
import { ErrorMessage } from '../../texts/error-message';
import { IbanInput } from '../../inputs/iban-input';

export type IBeneficiaryFormData = {
  name: string;
  iban: string;
  bic: string;
};

type IProps = {
  loading: boolean;
  control: Control<IBeneficiaryFormData>;
  errors: FieldErrors<IBeneficiaryFormData>;
  error: IDomainError<IBeneficiaryErrorCodes, IBeneficiaryErrorMessage> | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export const FormBeneficiary = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, theme.bank.container.centeredItem]}>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="name"
          rules={{
            required: true,
            minLength: 3,
            maxLength: 140,
            validate: LastName.validate,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('screens.beneficiary.new-beneficiary.name.label')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              IconLeft={ProfileGradient}
              placeholder={t('screens.beneficiary.new-beneficiary.name.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.name && props.errors.name.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.last-name.required'))}</Text>
        </View>
      )}
      {props.errors?.name && props.errors.name.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.last-name.invalid'))}</Text>
        </View>
      )}
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
              label={t('screens.beneficiary.new-beneficiary.IBAN.label')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              IconLeft={IbanGreenGradient}
              placeholder={t('screens.beneficiary.new-beneficiary.IBAN.placeholder')}
              onChange={(text) => onChange(text.replace(/\s/g, ''))}
            />
          )}
        />
      </View>
      {props.errors?.iban && props.errors.iban.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.IBAN.required'))}</Text>
        </View>
      )}
      {props.errors?.iban && props.errors.iban.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.IBAN.invalid'))}</Text>
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
              label={t('screens.beneficiary.new-beneficiary.BIC.label')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              IconLeft={BicGreenGradient}
              placeholder={t('screens.beneficiary.new-beneficiary.BIC.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.bic && props.errors.bic.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.BIC.required'))}</Text>
        </View>
      )}
      {props.errors?.bic && props.errors.bic.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.BIC.invalid'))}</Text>
        </View>
      )}
      <View style={styles.domainErrorContainer}>
        <ErrorMessage error={props.error} />
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
    marginTop: '20%',
  },
  inputContainer: { marginTop: 40 },
  errorContainer: {
    marginTop: 24,
  },
  domainErrorContainer: {
    marginTop: 24,
    width: '90%',
  },
  formSubmit: {
    marginTop: '30%',
  },
});
