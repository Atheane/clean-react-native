import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { firstLetterCapitalize } from '@clean-rn/utils';
import {
  Amount,
  ITransactionErrorCodes,
  ITransactionErrorMessage,
  ITransactionType,
} from '@clean-rn/transaction/domain';
import { IDomainError } from '@clean-rn/ddd';

import { Colors, SubmitButton, TextInput, ErrorMessage } from '@clean-rn/ui-mobile';

export type ITransferFormData = {
  amount: string;
  label: string;
};

type IProps = {
  loading: boolean;
  control: Control<ITransferFormData>;
  errors: FieldErrors<ITransferFormData>;
  error: IDomainError<ITransactionErrorCodes, ITransactionErrorMessage> | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export const FormTransfer = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container]}>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="amount"
          rules={{
            required: true,
            validate: (value: string) => {
              try {
                new Amount(value, ITransactionType.TRANSFER_OUT);
                return true;
              } catch (error: unknown) {
                return false;
              }
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              numeric
              placeholder={t('screens.transfer.amount')}
              label={t('screens.transfer.amount')}
              labelColor={Colors.primary.grey}
              short
              IconRight={() => (
                <View>
                  <Text style={theme.text.boldDarkBlue}>€G</Text>
                </View>
              )}
              onChange={(value: string) => {
                props.onFocus();
                onChange(value);
              }}
              value={value}
            />
          )}
        />
      </View>
      {props.errors?.amount && props.errors.amount.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.amount.required'))}</Text>
        </View>
      )}
      {props.errors?.amount && props.errors.amount.type === 'validate' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.amount.invalid'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="label"
          rules={{
            required: true,
            maxLength: 140,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder={t('screens.transfer.placeholder')}
              label={t('screens.transfer.label')}
              labelColor={Colors.primary.grey}
              onChange={onChange}
              value={value}
              onSubmitEditing={props.onSubmit}
            />
          )}
        />
      </View>
      {props.errors?.label && props.errors.label.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.label.required'))}</Text>
        </View>
      )}
      {props.errors?.label && props.errors.label.type === 'maxLength' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.label.invalid'))}</Text>
        </View>
      )}
      <View style={styles.domainErrorContainer}>
        <ErrorMessage
          error={props.error}
          errorMessage={t(`errors.domain-error.beneficiary.${props.error?.code}`)}
          genericErrorMessage={t('errors.other')}
        />
      </View>
      <View style={styles.formSubmit}>
        <SubmitButton
          title={t('screens.transfer.button')}
          uppercase={false}
          onSubmit={props.onSubmit}
          loading={props.loading}
          disabled={!!props.errors.amount || !!props.errors.label}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  inputContainer: { marginTop: 40 },
  errorContainer: {
    marginTop: 16,
  },
  domainErrorContainer: {
    marginTop: 24,
    width: '95%',
  },
  formSubmit: {
    marginTop: '15%',
    alignItems: 'center', // Ajoutez cette ligne
  },
});
