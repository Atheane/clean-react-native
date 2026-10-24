import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { IAddress, IUserErrorCodes, IUserErrorMessage } from '@clean-rn/user/domain';

import { MultipleOptionsCheckBox } from '../../checkboxes/multiple-options-checkBox';
import { SubmitButton } from '../../buttons/submit-button';
import { AddressInput } from '../../inputs/address-input';
import { ErrorMessage } from '../../texts/error-message';

type IProps = {
  language: string;
  loading: boolean;
  control: Control<ISignupAddressFormData>;
  errors: FieldErrors<ISignupAddressFormData>;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage> | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export type ISignupAddressFormData = {
  address: IAddress;
  specifiedUSPerson: string;
};

export const FormSignupAddress = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [disabled, setDisabled] = useState(true);
  return (
    <View style={[styles.container, theme.bank.container.centeredItem]}>
      <View style={(styles.inputContainer, { marginTop: 150 })}>
        <Controller
          control={props.control}
          name="address"
          render={({ field: { onChange } }) => (
            <AddressInput
              language={props.language}
              placeholder={t('signup-address.address.placeholder')}
              onAddressSelect={onChange}
              setDisabled={setDisabled}
              defaultValue={props.control._defaultValues.address as IAddress}
            />
          )}
        />
      </View>
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
              setDisabled={setDisabled}
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
          disabled={disabled}
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
  container: {},
  inputContainer: { marginVertical: 60 },
  errorContainer: {
    marginTop: 24,
    marginBottom: -24,
  },
  domainErrorContainer: {
    marginTop: 16,
  },
  formSubmit: {
    marginVertical: '10%',
  },
});
