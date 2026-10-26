import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { IAddress, IUserErrorCodes, IUserErrorMessage } from '@clean-rn/user/domain';
import { firstLetterCapitalize } from '@clean-rn/utils';

import { MultipleOptionsCheckBox } from '../../checkboxes/multiple-options-checkBox';
import { SubmitButton } from '../../buttons/submit-button';
import { AddressInput } from '../../inputs/address-input';
import { TextInput } from '../../inputs/text-input';
import { ErrorMessage } from '../../texts/error-message';
import { Colors } from '../../../constants';

type IProps = {
  language: string;
  loading: boolean;
  control: Control<ISignupAddressFormData>;
  reset: () => void;
  address: IAddress | undefined;
  errors: FieldErrors<ISignupAddressFormData>;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage> | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export type ISignupAddressFormData = {
  address: IAddress;
  zip: string;
  specifiedUSPerson: string;
};

export const FormSignupAddress = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleClearAddress = () => {
    props.reset();
  };

  return (
    <View style={[styles.container, theme.bank.container.centeredItem]}>
      <View style={(styles.inputContainer, { marginTop: 150 })}>
        <Controller
          control={props.control}
          name="address"
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <AddressInput
              language={props.language}
              placeholder={t('signup-address.address.placeholder')}
              onAddressSelect={onChange}
              address={props.address as IAddress}
              clearAddress={handleClearAddress}
            />
          )}
        />
      </View>
      {props.errors?.address && props.errors.address.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.address.required'))}</Text>
        </View>
      )}
      {props.control._formValues.address && props.control._formValues.address.zip === '' && (
        <View style={styles.inputContainer}>
          <Controller
            control={props.control}
            name="zip"
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <TextInput
                label={t('signup-address.zip.label')}
                placeholder={t('signup-address.zip.placeholder')}
                onChange={onChange}
                labelColor={Colors.bank.primary.grey}
                numeric
              />
            )}
          />
        </View>
      )}
      {props.control._formValues.address &&
        props.control._formValues.address.zip === '' &&
        props.errors?.zip &&
        props.errors.zip.type === 'required' && (
          <View style={styles.errorContainer}>
            <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.zip.required'))}</Text>
          </View>
        )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="specifiedUSPerson"
          render={({ field: { onChange } }) => (
            <MultipleOptionsCheckBox
              label={t('signup-address.usperson.label')}
              subtitle={t('signup-address.usperson.subtitle')}
              optionsTitle={[t('signup-address.usperson.no'), t('signup-address.usperson.yes')]}
              optionsValues={['0', '1']}
              onChange={onChange}
              defaultValue={props.control._defaultValues.specifiedUSPerson}
            />
          )}
        />
      </View>
      <View style={styles.domainErrorContainer}>
        <ErrorMessage error={props.error} />
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
    marginTop: 50,
    marginBottom: 150,
  },
  inputContainer: { marginTop: 30, zIndex: -1 },
  errorContainer: {
    marginTop: 24,
    marginBottom: -24,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
  formSubmit: {
    marginTop: 80,
  },
});
