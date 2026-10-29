import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { HouseHeaterE as HeaterE } from '@bank/carbon-weight/dist';
import { Colors, Dropdown, ErrorMessage } from '@clean-rn/ui-mobile';
import { useTheme } from '@rneui/themed';
import { IDomainError } from '@clean-rn/ddd';
import { ICarbonErrorCodes, ICarbonErrorMessage } from '@clean-rn/carbon/domain';

type ISecondaryHeatFormProps = {
  heatType?: string;
  handleChangeForm: ({ value }: { key: string; value: string }) => void;
  domainError?: IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>;
};

export const SecondaryHeatForm = (props: ISecondaryHeatFormProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const dataHeating = Object.entries(HeaterE).map(([key, value]) => ({
    key,
    value: t('screens.heat-primeum.dropdown-heat-type.' + value),
  }));

  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={theme.text.grey}>{t('screens.heat-primeum.instruction-secondary-heat-type')}</Text>
      </View>
      <Dropdown
        placeholder={t('screens.heat-primeum.placeholder')}
        data={dataHeating}
        value={props.heatType}
        onSelect={({ value }) => props.handleChangeForm({ key: 'heatType', value })}
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
