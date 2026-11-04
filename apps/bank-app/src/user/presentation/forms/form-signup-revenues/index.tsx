import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import { IAssets, IIncome, IOccupation, IUserErrorCodes, IUserErrorMessage } from '@clean-rn/user/domain';
import { firstLetterCapitalize } from '@clean-rn/utils';

import { SubmitButton, Dropdown, Colors } from '@clean-rn/ui-mobile';
import { ErrorMessage } from 'apps/bank-app/src/shared/presentation/components/error-message';

type IProps = {
  control: Control<ISignupRevenuesFormData>;
  errors: FieldErrors<ISignupRevenuesFormData>;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage>;
  onSubmit: () => void;
  onFocus: () => void;
  loading: boolean;
};

export type ISignupRevenuesFormData = {
  income: IIncome;
  occupation: IOccupation;
  assets: IAssets;
};

export const FormSignupRevenues = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const DATA_INCOME = Object.keys(IIncome)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      key,
      value: t('signup-revenues.income.' + key),
    }));

  const DATA_ASSETS = Object.keys(IAssets)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      key,
      value: t('signup-revenues.assets.' + key),
    }));

  const DATA_OCCUPATION = Object.keys(IOccupation)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      key,
      value: t('signup-revenues.occupation.' + key),
    }));

  return (
    <View style={[styles.container]}>
      <View style={[styles.inputContainer]}>
        <Controller
          control={props.control}
          name="income"
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <Dropdown
              data={DATA_INCOME}
              label={t('signup-revenues.income.label')}
              labelColor={Colors.primary.grey}
              placeholder={t('signup-revenues.income.placeholder')}
              onSelect={(item) => onChange(IIncome[item.key as keyof typeof IIncome])}
            />
          )}
        />
      </View>
      {props.errors?.income && props.errors.income.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.income.required'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="assets"
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <Dropdown
              data={DATA_ASSETS}
              placeholder={t('signup-revenues.assets.placeholder')}
              label={t('signup-revenues.assets.label')}
              labelColor={Colors.primary.grey}
              onSelect={(item) => onChange(IAssets[item.key as keyof typeof IAssets])}
            />
          )}
        />
      </View>
      {props.errors?.assets && props.errors.assets.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.assets.required'))}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <Controller
          control={props.control}
          name="occupation"
          rules={{
            required: true,
          }}
          render={({ field: { onChange } }) => (
            <Dropdown
              data={DATA_OCCUPATION}
              placeholder={t('signup-revenues.occupation.placeholder')}
              label={t('signup-revenues.occupation.label')}
              labelColor={Colors.primary.grey}
              onSelect={(item) => onChange(IOccupation[item.key as keyof typeof IOccupation])}
            />
          )}
        />
      </View>
      {props.errors?.occupation && props.errors.occupation.type === 'required' && (
        <View style={styles.errorContainer}>
          <Text style={theme.text.errors}>{firstLetterCapitalize(t('errors.occupation.required'))}</Text>
        </View>
      )}
      {props.error && (
        <View style={styles.errorContainer}>
          <ErrorMessage
            error={props.error}
            errorMessage={t(`errors.domain-error.user.${props.error.code}`)}
            genericErrorMessage={t('errors.other')}
          />
        </View>
      )}
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
    flex: 1,
  },
  inputContainer: { marginTop: 30 },
  errorContainer: {
    marginTop: 16,
  },
  formSubmit: {
    marginTop: '20%',
  },
});
