import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { IContactErrorCodes, IContactErrorMessage } from '@clean-rn/contact/domain';

import { Bic as BicIcon, Iban as IbanIcon, Person } from '../../../assets';
import { Colors } from '../../../constants';
import { firstLetterCapitalize } from '../../../utils';

import { SubmitButton } from '../../buttons/submit-button';
import { TextInput } from '../../inputs/text-input';
import { ErrorMessage } from '../../texts/error-message';

export type IContactFormData = {
  firstname: string;
  lastname: string;
  phone: string;
};

type IProps = {
  loading: boolean;
  control: Control<IContactFormData>;
  errors: FieldErrors<IContactFormData>;
  error: IDomainError<IContactErrorCodes, IContactErrorMessage> | null;
  onSubmit: () => void;
  onFocus: () => void;
};

export const FormContact = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, theme.bank.container.centeredItem]}>
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="firstname"
          rules={{
            required: true,
            minLength: 3,
            maxLength: 140,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label={t('screens.beneficiary.new-contact.firstname.label')}
              labelColor={Colors.bank.primary.grey}
              value={value}
              icon={() => <Person style={{ color: Colors.bank.primary.lightGreen }} />}
              placeholder={t('screens.beneficiary.new-contact.firstname.placeholder')}
              onChange={onChange}
            />
          )}
        />
      </View>
      {props.errors?.firstname && props.errors.firstname.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.bank.text.errors}>{firstLetterCapitalize(t('errors.firstname.required'))}</Text>
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
