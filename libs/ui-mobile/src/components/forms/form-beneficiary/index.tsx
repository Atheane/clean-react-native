import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { BIC, IBeneficiaryErrorCodes, IBeneficiaryErrorMessage, IBAN } from '@clean-rn/beneficiary/domain';

import { Bic as BicIcon, Iban as IbanIcon, Person } from '../../../assets';
import { Colors } from '../../../constants';
import { firstLetterCapitalize } from '../../../utils';

import { SubmitButton } from '../../buttons/submit-button';
import { TextInput } from '../../inputs/text-input';
import { ErrorMessage } from '../../texts/error-message';

export type IBeneficiaryFormData = {
  name: string;
  IBAN: string;
  BIC: string;
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
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('screens.beneficiary.new-beneficiary.name.label')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              icon={() => <Person style={{ color: Colors.bank.primary.lightGreen }} />}
              placeholder={t('screens.beneficiary.new-beneficiary.name.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.name && props.errors.name.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.name.required'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="IBAN"
          rules={{
            required: true,
            validate: (value) => IBAN.validate(value),
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('screens.beneficiary.new-beneficiary.IBAN.label')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              icon={() => <IbanIcon style={{ color: Colors.bank.primary.lightGreen }} />}
              placeholder={t('screens.beneficiary.new-beneficiary.IBAN.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.IBAN && props.errors.IBAN.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.IBAN.required'))}</Text>
        </View>
      )}
      {props.errors?.IBAN && props.errors.IBAN.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.IBAN.invalid'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="BIC"
          rules={{
            required: true,
            validate: (value) => BIC.validate(value),
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('screens.beneficiary.new-beneficiary.BIC.label')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              icon={() => <BicIcon style={{ color: Colors.bank.primary.lightGreen }} />}
              placeholder={t('screens.beneficiary.new-beneficiary.BIC.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.BIC && props.errors.BIC.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.BIC.required'))}</Text>
        </View>
      )}
      {props.errors?.BIC && props.errors.BIC.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.BIC.invalid'))}</Text>
        </View>
      )}
      <View style={styles.domainErrorContainer}>
        <ErrorMessage error={props.error} />
      </View>
      <View style={styles.formSubmit}>
        <SubmitButton
          disabled={false}
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
    flex: 1,
    marginTop: -150,
  },
  inputContainer: { marginTop: 30 },
  errorContainer: {
    marginTop: 24,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
  formSubmit: {
    marginTop: 50,
    marginBottom: 100,
  },
});
