import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { DomainEventManager } from '@clean-rn/ddd';
import { Dropdown, ErrorMessage, SubmitButton } from '@clean-rn/ui-mobile';
import {
  FOOTPRINT_EVENTS,
  HEATER_TYPE,
  HEATER_USAGE,
  IFootprintErrorCodes,
  Heater,
} from '@clean-rn/footprint/domain';
import { IRootState } from '../../../../shared/application/state-management/reducers/root-reducer';
import { addHeaters, initializeFootprint } from '../../../application/commands';
import { IHeaterProps } from '../../types';

type IProps = {
  goToNextTab: (nextIndex: number) => number | undefined;
};

export const SanitaryHeatForm = (props: IProps) => {
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

  const [formData, setFormData] = useState<Partial<IHeaterProps>>();

  const handleChangeForm = ({ key, value }: { key: string; value: string | number }) => {
    const newFormData = { ...formData, usage: HEATER_USAGE.SANITARY, [key]: value };
    if (key === 'installationYear' && value === 2011 && newFormData.previousHeatType) {
      newFormData.previousHeatType = undefined;
    }
    setFormData(newFormData);
    dispatch(initializeFootprint());
  };

  const dispatch = useDispatch();

  const { pending, error: domainError } = useSelector((state: IRootState) => state.footprint);

  const handleOnSubmit = async () => {
    dispatch(addHeaters(formData as IHeaterProps));
  };

  const [heatersAdded, setHeatersAdded] = useState(false);

  const handleHeatersAdded = useCallback((heater: Heater) => {
    if (heater.properties.heaterUsage === HEATER_USAGE.SANITARY) {
      setHeatersAdded(true);
    }
  }, []);

  useEffect(() => {
    const domainEventManager = DomainEventManager.getInstance();
    domainEventManager.on(FOOTPRINT_EVENTS.HEATER_ADDED, handleHeatersAdded);
    return () => {
      domainEventManager.off(FOOTPRINT_EVENTS.HEATER_ADDED, handleHeatersAdded);
    };
  }, [handleHeatersAdded]);

  useEffect(() => {
    if (heatersAdded) {
      props.goToNextTab(2);
    }
  }, [heatersAdded, props]);

  return (
    <View>
      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={theme.text.grey}>{t('screens.heat-primeum.instruction-sanitary-heat-type')}</Text>
        </View>
      </View>
      <Dropdown
        placeholder={t('screens.heat-primeum.placeholder')}
        data={dataHeating}
        value={formData?.heatType}
        onSelect={({ key }) => handleChangeForm({ key: 'heatType', value: key })}
      />
      {formData?.usage === HEATER_USAGE.SANITARY &&
        !formData.heatType &&
        domainError &&
        domainError.code === IFootprintErrorCodes.INVALID_HEATER_TYPE && (
          <View style={styles.errorContainer}>
            <ErrorMessage
              error={domainError}
              errorMessage={t(`errors.domain-error.footprint.${domainError?.code}`)}
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
      {formData?.usage === HEATER_USAGE.SANITARY &&
        !formData.installationYear &&
        domainError &&
        domainError.code === IFootprintErrorCodes.INVALID_HEATER_DATE && (
          <View style={styles.errorContainer}>
            <ErrorMessage
              error={domainError}
              errorMessage={t(`errors.domain-error.footprint.${domainError?.code}`)}
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
              >{`${t('screens.heat-primeum.instruction-sanitary-heat-type-before')} ${formData.installationYear}`}</Text>
            </View>
          </View>

          <Dropdown
            placeholder={t('screens.heat-primeum.placeholder')}
            data={dataHeating}
            value={formData?.previousHeatType}
            onSelect={({ key }) => handleChangeForm({ key: 'previousHeatType', value: key })}
          />
          {formData.usage === HEATER_USAGE.SANITARY &&
            !formData.previousHeatType &&
            domainError &&
            domainError.code === IFootprintErrorCodes.INVALID_HEATER_TYPE && (
              <View style={styles.errorContainer}>
                <ErrorMessage
                  error={domainError}
                  errorMessage={t(`errors.domain-error.footprint.${domainError?.code}`)}
                  genericErrorMessage={t('errors.other')}
                />
              </View>
            )}
        </View>
      )}
      {formData?.usage === HEATER_USAGE.SANITARY &&
        domainError &&
        domainError.code === IFootprintErrorCodes.HEATER_ALREADY_EXISTS && (
          <View style={styles.errorContainer}>
            <ErrorMessage
              error={domainError}
              errorMessage={t(`errors.domain-error.footprint.${domainError?.code}`)}
              genericErrorMessage={t('errors.other')}
            />
          </View>
        )}
      <View style={[styles.rowContainer, { marginTop: 80 }]}>
        <SubmitButton
          title={t('screens.heat-primeum.next-step')}
          disabled={!formData?.heatType || !formData?.installationYear}
          uppercase
          loading={pending}
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
