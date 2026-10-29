import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { HouseHeaterE as HeaterE } from '@bank/carbon-weight/dist';
import { Colors, Dropdown, ErrorMessage } from '@clean-rn/ui-mobile';
import { IDomainError } from '@clean-rn/ddd';
import { ICarbonErrorCodes, ICarbonErrorMessage } from '@clean-rn/carbon/domain';

type IMainHeatFormProps = {
  heatType?: string;
  installationYear?: number;
  previousHeatType?: string;
  handleChangeForm: ({ value }: { key: string; value: string | number }) => void;
  domainError?: IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>;
};

export const MainHeatForm = (props: IMainHeatFormProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const dataHeating = Object.entries(HeaterE).map(([key, value]) => ({
    key,
    value: t('screens.heat-primeum.dropdown-heat-type.' + value),
  }));

  const dataYears = Array.from({ length: new Date().getFullYear() - 2008 }, (_, index) => {
    const year = 2009 + index;
    if (index === 0) return { key: '2009', value: t('screens.heat-primeum.dropdown-years.before-2010') };
    return { key: year.toString(), value: year.toString() };
  });

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={theme.text.grey}>{t('screens.heat-primeum.instruction-heat-type')}</Text>
      </View>
      <Dropdown
        placeholder={t('screens.heat-primeum.placeholder')}
        data={dataHeating}
        value={props.heatType}
        onSelect={({ key }) => props.handleChangeForm({ key: 'heatType', value: key })}
      />
      {props.domainError && props.domainError.code === ICarbonErrorCodes.MISSING_HEATER && (
        <View style={styles.errorContainer}>
          <ErrorMessage
            error={props.domainError}
            errorMessage={t(`errors.domain-error.carbon.${props.domainError?.code}`)}
            genericErrorMessage={t('errors.other')}
          />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={theme.text.grey}>
          {t('screens.heat-primeum.instruction-heat-type-installation-date')}
        </Text>
      </View>
      <Dropdown
        placeholder={t('screens.heat-primeum.placeholder')}
        data={dataYears}
        value={props.installationYear?.toString()}
        onSelect={({ key }) => props.handleChangeForm({ key: 'installationYear', value: parseInt(key) })}
      />
      {props.domainError && props.domainError.code === ICarbonErrorCodes.MISSING_HEATER_INSTALLATION_YEAR && (
        <View style={styles.errorContainer}>
          <ErrorMessage
            error={props.domainError}
            errorMessage={t(`errors.domain-error.carbon.${props.domainError?.code}`)}
            genericErrorMessage={t('errors.other')}
          />
        </View>
      )}
      {props.installationYear && props.installationYear >= 2010 && (
        <View>
          <View style={styles.textContainer}>
            <Text
              style={theme.text.grey}
            >{`${t('screens.heat-primeum.instruction-heat-type-before')} ${props.installationYear}`}</Text>
          </View>
          <Dropdown
            placeholder={t('screens.heat-primeum.placeholder')}
            data={dataHeating}
            value={props.previousHeatType}
            onSelect={({ key }) => props.handleChangeForm({ key: 'previousHeatType', value: key })}
          />
          {props.domainError && props.domainError.code === ICarbonErrorCodes.MISSING_PREVIOUS_HEATER_TYPE && (
            <View style={styles.errorContainer}>
              <ErrorMessage
                error={props.domainError}
                errorMessage={t(`errors.domain-error.carbon.${props.domainError?.code}`)}
                genericErrorMessage={t('errors.other')}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.primary.darkWhite,
  },
  darkWhiteContainer: {
    flex: 1,
    backgroundColor: Colors.primary.darkWhite,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  tabPageContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary.darkWhite,
  },
  textContainer: {
    width: '90%',
    marginVertical: 20,
  },
  errorContainer: {
    marginTop: 16,
  },
});
