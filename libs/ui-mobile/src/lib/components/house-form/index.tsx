import { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { sort } from 'fast-sort';
import { getLocales } from 'expo-localization';

import { HouseHeaterE as HeaterE, HouseT, HouseYearE } from '@bank/carbon-weight/dist';

import { IDepartment, departmentsFR, OLD_BUILDING_YEAR } from '@clean-rn/carbon/domain';

import { Department, Flame, Surface } from '../../assets';
import { Colors } from '../../constants';
import { todayYear } from '../../utils';

import { Dropdown } from '../dropdown';
import { NoCO2 } from '../no-co2';
import { SelectNumber } from '../select-number';
import { Slider } from '../slider';

type IProps = {
  onChangeForm: (value: HeaterE) => void;
  onChangeField: (key: keyof HouseT | 'consumption', value: number | HouseYearE) => void;
};

const locales = getLocales();
const country = locales[0]?.regionCode || undefined;

export const HouseForm = (props: IProps) => {
  const { t } = useTranslation();

  const dataHeating = Object.entries(HeaterE).map(([key, value]) => ({
    key,
    value: t('screens.carbonHouse.dropdown.' + value),
  }));

  const [heater, setHeater] = useState<HeaterE>();
  const handleOnChange = useCallback(
    ({ key }: { key: string }) => {
      setHeater(HeaterE[key as keyof typeof HeaterE]);
      setConsumption(5000);
      props.onChangeForm(HeaterE[key as keyof typeof HeaterE]);
    },
    [props.onChangeForm],
  );

  // slider consumption
  const [consumption, setConsumption] = useState<number>(5000);
  const handleSlider = useCallback(
    (value: number) => {
      setConsumption(value);
      props.onChangeField('consumption', value);
    },
    [props.onChangeField],
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
    ({ value }: { value: string }) => {
      setRegion(parseInt(value));
      props.onChangeField('region', parseInt(value));
    },
    [props.onChangeField],
  );

  const [surface, setSurface] = useState<number>(60);
  const handleOnChangeSurface = useCallback(
    (value: number) => {
      setSurface(value);
      props.onChangeField('surface', value);
    },
    [props.onChangeField],
  );

  const [builtYear, setBuiltYear] = useState<number>(1980);
  const handleBuiltYear = useCallback(
    (value: number) => {
      setBuiltYear(value);

      props.onChangeField('built', value <= OLD_BUILDING_YEAR ? HouseYearE.old : HouseYearE.recent);
    },
    [props.onChangeField],
  );

  const ConditionalForm = () => {
    if (heater === HeaterE.coal || heater === HeaterE.propane) {
      return (
        <Slider
          label={t('screens.carbonHouse.slider.consumption')}
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
          label={t('screens.carbonHouse.slider.consumption')}
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
              label={t('screens.carbonHouse.dropdown.region')}
              placeholder={t('screens.carbonHouse.dropdown.region')}
              icon={Department}
              data={sortedDeps}
              value={region.toString()}
              onSelect={handleOnChangeRegion}
            />
          )}
          <View style={styles.selectNumberContainer}>
            <SelectNumber
              label={t('screens.carbonHouse.surface')}
              icon={() => <Surface style={{ color: Colors.icon.lightGreenTransparent }} />}
              value={surface}
              onChange={handleOnChangeSurface}
            />
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              label={t('screens.carbonHouse.slider.builtYear')}
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
      return <NoCO2 text={t('screens.carbonHouse.noCO2')} />;
    }
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Dropdown
        label={t('screens.carbonHouse.dropdown.heater')}
        placeholder={t('screens.carbonHouse.dropdown.heater')}
        icon={() => <Flame style={{ color: Colors.icon.lightGreenTransparent }} />}
        data={dataHeating}
        onSelect={handleOnChange}
      />
      <View style={styles.formContainer}>{ConditionalForm()}</View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 36,
  },
  sliderContainer: {
    marginTop: 36,
  },
  selectNumberContainer: {
    marginTop: 36,
  },
});
