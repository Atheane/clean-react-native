import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { useTheme } from '@rneui/themed';

import { IDomainError } from '@clean-rn/ddd';
import {
  APP_USER_MONTHLY_INCOME_RANGE,
  APP_USER_OCCUPATION,
  APP_USER_PERSONAL_ASSETS_RANGE,
} from '@clean-rn/user/domain';
import { IUserErrorCodes, IUserErrorMessage } from '@clean-rn/user/domain';
import { firstLetterCapitalize } from '@clean-rn/utils';

import { SubmitButton, Dropdown, Colors } from '@clean-rn/ui-mobile';
import { ErrorMessage } from '../../../../shared/presentation/components/error-message';

type IProps = {
  control: Control<IRevenuesFormData>;
  errors: FieldErrors<IRevenuesFormData>;
  error: IDomainError<IUserErrorCodes, IUserErrorMessage>;
  onSubmit: () => void;
  onFocus: () => void;
  loading: boolean;
};

export type IRevenuesFormData = {
  income: APP_USER_MONTHLY_INCOME_RANGE;
  occupation: APP_USER_OCCUPATION;
  assets: APP_USER_PERSONAL_ASSETS_RANGE;
};

export const FormRevenues = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const DATA_INCOME = Object.keys(APP_USER_MONTHLY_INCOME_RANGE)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      key,
      value: t('screens.kyc.revenues.income.' + key),
    }));

  const DATA_ASSETS = Object.keys(APP_USER_PERSONAL_ASSETS_RANGE)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      key,
      value: t('screens.kyc.revenues.assets.' + key),
    }));

  const DATA_OCCUPATION = Object.keys(APP_USER_OCCUPATION)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      key,
      value: t('screens.kyc.revenues.occupation.' + key),
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
              label={t('screens.kyc.revenues.income.label')}
              labelColor={Colors.primary.grey}
              placeholder={t('screens.kyc.revenues.income.placeholder')}
              onSelect={(item) =>
                onChange(
                  APP_USER_MONTHLY_INCOME_RANGE[item.key as keyof typeof APP_USER_MONTHLY_INCOME_RANGE],
                )
              }
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
              placeholder={t('screens.kyc.revenues.assets.placeholder')}
              label={t('screens.kyc.revenues.assets.label')}
              labelColor={Colors.primary.grey}
              onSelect={(item) =>
                onChange(
                  APP_USER_PERSONAL_ASSETS_RANGE[item.key as keyof typeof APP_USER_PERSONAL_ASSETS_RANGE],
                )
              }
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
              placeholder={t('screens.kyc.revenues.occupation.placeholder')}
              label={t('screens.kyc.revenues.occupation.label')}
              labelColor={Colors.primary.grey}
              onSelect={(item) => onChange(APP_USER_OCCUPATION[item.key as keyof typeof APP_USER_OCCUPATION])}
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
