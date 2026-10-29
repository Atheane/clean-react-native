import { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { sort } from 'fast-sort';
import { getLocales } from 'expo-localization';

import { todayYear } from '@clean-rn/utils';

import { HouseHeaterE as HeaterE, HouseT, HouseYearE } from '@bank/carbon-weight/dist';
import { YearE } from '@bank/carbon-weight/dist/house/types';

import { IDepartment, departmentsFR, OLD_BUILDING_YEAR } from '@clean-rn/carbon/domain';

import {
  Department,
  Flame,
  Surface,
  Colors,
  Dropdown,
  SelectNumber,
  Slider,
  NoCO2,
} from '@clean-rn/ui-mobile';

type IProps = {
  initialValues: (HouseT & { consumption: number } & { builtYear: number }) | null;
  onChangeForm: (value: HeaterE) => void;
  onChangeField: (key: keyof HouseT | 'consumption' | 'builtYear', value: number | YearE) => void;
};

const locales = getLocales();
const country = locales[0]?.regionCode || undefined;

export const HeaterFootprintEstimationForm = (props: IProps) => {
  const { t } = useTranslation();

  const dataHeating = Object.entries(HeaterE).map(([key, value]) => ({
    key,
    value: t('screens.carbon-house.dropdown.' + value),
  }));

  const [heater, setHeater] = useState<HeaterE>();
  const handleOnChange = useCallback(
    ({ key }: { key: string }) => {
      setHeater(HeaterE[key as keyof typeof HeaterE]);
      setConsumption(5000);
      props.onChangeForm(HeaterE[key as keyof typeof HeaterE]);
    },
    [props],
  );

  // slider consumption
  const [consumption, setConsumption] = useState<number>(5000);
  const handleSlider = useCallback(
    (value: number) => {
      setConsumption(value);
      props.onChangeField('consumption', value);
    },
    [props],
  );

  // gas
  const sortedDeps = sort(departmentsFR as IDepartment[])
    .asc((dep: IDepartment) => dep.NCC)
    .map((dep: IDepartment) => ({
      key: dep.DEP,
      value: dep.NCC,
    }));

  const [region, setRegion] = useState<number>(1);
  const handleOnChangeRegion = useCallback(
    ({ key }: { key: string }) => {
      setRegion(parseInt(key));
      props.onChangeField('region', parseInt(key));
    },
    [props],
  );

  const [surface, setSurface] = useState<number>(60);
  const handleOnChangeSurface = useCallback(
    (value: number) => {
      setSurface(value);
      props.onChangeField('surface', value);
    },
    [props],
  );

  const [builtYear, setBuiltYear] = useState<number>(1980);
  const handleBuiltYear = useCallback(
    (value: number) => {
      setBuiltYear(value);
      props.onChangeField('builtYear', value);
      props.onChangeField('built', value <= OLD_BUILDING_YEAR ? HouseYearE.old : HouseYearE.recent);
    },
    [props],
  );

  useEffect(() => {
    if (props.initialValues) {
      setHeater(props.initialValues.heater);
      setConsumption(props.initialValues.consumption);
      setRegion(props.initialValues.region ?? 1);
      setSurface(props.initialValues.surface ?? 60);
      setBuiltYear(props.initialValues.builtYear ?? 1980);
    }
  }, [props.initialValues]);

  const convertDepNumberToName = (depNumber: number) =>
    sortedDeps.find(({ key }) => key === depNumber.toString())?.value;

  const ConditionalForm = () => {
    if (heater === HeaterE.coal || heater === HeaterE.propane) {
      return (
        <Slider
          label={t('screens.carbon-house.slider.consumption')}
          minValue={0}
          maxValue={10000}
          value={consumption}
          step={100}
          onChange={handleSlider}
          unit={' kg'}
        />
      );
    } else if (heater === HeaterE.fuelOil) {
      return (
        <Slider
          label={t('screens.carbon-house.slider.consumption')}
          minValue={0}
          maxValue={10000}
          value={consumption}
          step={100}
          onChange={handleSlider}
          unit={' L'}
        />
      );
    } else if (heater === HeaterE.gas) {
      return (
        <View>
          {country === 'FR' && (
            <Dropdown
              label={t('screens.carbon-house.dropdown.region')}
              placeholder={t('screens.carbon-house.dropdown.region')}
              icon={() => <Department style={{ color: Colors.primary.lightGreen }} />}
              data={sortedDeps}
              value={region ? convertDepNumberToName(region) : undefined}
              onSelect={handleOnChangeRegion}
              defaultValue={
                props.initialValues?.region ? convertDepNumberToName(props.initialValues.region) : undefined
              }
            />
          )}
          <View style={styles.formContainer}>
            <SelectNumber
              label={t('screens.carbon-house.surface')}
              icon={() => <Surface style={{ color: Colors.primary.lightGreen }} />}
              value={surface}
              onChange={handleOnChangeSurface}
            />
          </View>
          <View style={styles.formContainer}>
            <Slider
              label={t('screens.carbon-house.slider.built-year')}
              minValue={1900}
              maxValue={todayYear()}
              value={builtYear}
              onChange={handleBuiltYear}
            />
          </View>
        </View>
      );
    } else if (!heater) {
      return <View />;
    } else {
      return <NoCO2 text={t('screens.carbon-house.no-CO2')} />;
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        label={t('screens.carbon-house.dropdown.heater')}
        placeholder={t('screens.carbon-house.dropdown.heater')}
        icon={() => <Flame style={{ color: Colors.primary.lightGreen }} />}
        data={dataHeating}
        onSelect={handleOnChange}
        defaultValue={t(`screens.carbon-house.dropdown.${heater ?? 'heater'}`)}
      />
      <View style={styles.formContainer}>{ConditionalForm()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    marginTop: 24,
  },
});
