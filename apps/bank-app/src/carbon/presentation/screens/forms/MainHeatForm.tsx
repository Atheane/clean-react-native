import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { Dropdown, ErrorMessage, SubmitButton } from '@clean-rn/ui-mobile';
import { IDomainError } from '@clean-rn/ddd';
import { HEATER_TYPE, HEATER_USAGE, ICarbonErrorCodes, ICarbonErrorMessage } from '@clean-rn/carbon/domain';
import { Heater } from '@clean-rn/carbon/domain';
import { mapHeaterPropsToDomain } from '../../mappers';
import { IHeaterProps } from '../../types';

export const MainHeatForm = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const dataHeating = Object.entries(HEATER_TYPE).map(([key, value]) => ({
    key,
    value: t('screens.heat-primeum.dropdown-heat-type.' + value),
  }));

  const dataYears = Array.from({ length: new Date().getFullYear() - 2010 }, (_, index) => {
    const year = 2011 + index;
    if (index === 0) return { key: '2011', value: t('screens.heat-primeum.dropdown-years.before-2012') };
    return { key: year.toString(), value: year.toString() };
  });

  const [formData, setFormData] = useState<Partial<IHeaterProps>>({ usage: HEATER_USAGE.MAIN });
  const [domainError, setDomainError] = useState<IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>>();

  const handleChangeForm = ({ key, value }: { key: string; value: string | number }) => {
    setDomainError(undefined);
    const newFormData = { ...formData, [key]: value };
    if (key === 'installationYear' && value === 2011 && newFormData.previousHeatType) {
      newFormData.previousHeatType = undefined;
    }
    setFormData(newFormData);
  };
  const handleOnSubmit = async () => {
    try {
      const heaters: Heater[] = await mapHeaterPropsToDomain(formData as IHeaterProps);
      console.log('dispatch(addHeaters(heaters))', heaters);
    } catch (error) {
      console.log('error', error);
      setDomainError(error as IDomainError<ICarbonErrorCodes, ICarbonErrorMessage>);
    }
  };

  return (
    <View>
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={theme.text.grey}>{t('screens.heat-primeum.instruction-heat-type')}</Text>
        </View>
      </View>
      <Dropdown
        placeholder={t('screens.heat-primeum.placeholder')}
        data={dataHeating}
        value={formData?.heatType}
        onSelect={({ key }) => handleChangeForm({ key: 'heatType', value: key })}
      />
      {!formData.heatType && domainError && domainError.code === ICarbonErrorCodes.INVALID_HEATER_TYPE && (
        <View style={styles.errorContainer}>
          <ErrorMessage
            error={domainError}
            errorMessage={t(`errors.domain-error.carbon.${domainError?.code}`)}
            genericErrorMessage={t('errors.other')}
          />
        </View>
      )}
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={theme.text.grey}>
            {t('screens.heat-primeum.instruction-heat-type-installation-date')}
          </Text>
        </View>
      </View>
      <Dropdown
        placeholder={t('screens.heat-primeum.placeholder')}
        data={dataYears}
        value={formData?.installationYear?.toString()}
        onSelect={({ key }) => handleChangeForm({ key: 'installationYear', value: parseInt(key) })}
      />
      {domainError && domainError.code === ICarbonErrorCodes.INVALID_HEATER_DATE && (
        <View style={styles.errorContainer}>
          <ErrorMessage
            error={domainError}
            errorMessage={t(`errors.domain-error.carbon.${domainError?.code}`)}
            genericErrorMessage={t('errors.other')}
          />
        </View>
      )}
      {formData?.installationYear && formData.installationYear >= 2012 && (
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text
                style={theme.text.grey}
              >{`${t('screens.heat-primeum.instruction-heat-type-before')} ${formData.installationYear}`}</Text>
            </View>
          </View>

          <Dropdown
            placeholder={t('screens.heat-primeum.placeholder')}
            data={dataHeating}
            value={formData?.previousHeatType}
            onSelect={({ key }) => handleChangeForm({ key: 'previousHeatType', value: key })}
          />
          {!formData.previousHeatType &&
            domainError &&
            domainError.code === ICarbonErrorCodes.INVALID_HEATER_TYPE && (
              <View style={styles.errorContainer}>
                <ErrorMessage
                  error={domainError}
                  errorMessage={t(`errors.domain-error.carbon.${domainError?.code}`)}
                  genericErrorMessage={t('errors.other')}
                />
              </View>
            )}
        </View>
      )}
      <View style={[styles.rowContainer, { marginTop: 80 }]}>
        <SubmitButton
          title={t('screens.heat-primeum.next-step')}
          disabled={!formData?.heatType || !formData?.installationYear}
          uppercase
          onSubmit={handleOnSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'center',
    marginVertical: 5,
  },
  textContainer: {
    width: '90%',
    marginVertical: 20,
  },
  errorContainer: {
    marginTop: 16,
  },
});
