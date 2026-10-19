import { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';

import { VehicleFuelE as FuelE } from '@bank/carbon-weight/dist';

import { Gasoline } from '../../../assets';
import { Colors } from '../../../constants';

import { Slider } from '../../inputs/slider';
import { Dropdown } from '../../dropdowns/dropdown';
import { NoCO2 } from '../../texts/no-co2';

type IProps = {
  onChangeForm: (value: FuelE) => void;
  onChangeField: (key: 'mpg' | 'distanceByYear', value: number) => void;
};

export const TransportForm = (props: IProps) => {
  const { t } = useTranslation();

  const dataFuel = Object.entries(FuelE).map(([key, value]) => ({
    key,
    value: t('screens.carbon-transport.dropdown.' + value),
  }));

  const [fuel, setFuel] = useState<FuelE>();
  const handleOnChange = useCallback(
    ({ key }: { key: string }) => {
      setFuel(FuelE[key as keyof typeof FuelE]);
      setMpg(8);
      setDistanceByYear(20000);
      props.onChangeForm(FuelE[key as keyof typeof FuelE]);
    },
    [props],
  );

  // slider consumption
  const [mpg, setMpg] = useState<number>(8);
  const handleSliderConsumption = useCallback(
    (value: number) => {
      setMpg(value);
      props.onChangeField('mpg', value);
    },
    [props],
  );

  // slider mileage / year
  const [distanceByYear, setDistanceByYear] = useState<number>(20000);
  const handleSliderDistance = useCallback(
    (value: number) => {
      setDistanceByYear(value);
      props.onChangeField('distanceByYear', value);
    },
    [props],
  );

  const ConditionalForm = () => {
    if (fuel !== FuelE.electric) {
      return (
        <View>
          <Slider
            label={t('screens.carbon-transport.slider.mpg')}
            minValue={0}
            maxValue={25}
            value={mpg}
            onChange={handleSliderConsumption}
            unit={' L/100km'}
          />
          <View style={styles.container}>
            <Slider
              label={t('screens.carbon-transport.slider.distance-by-year')}
              minValue={0}
              maxValue={150000}
              step={500}
              value={distanceByYear}
              onChange={handleSliderDistance}
              unit={' km'}
            />
          </View>
        </View>
      );
    } else {
      return <NoCO2 text={t('screens.carbon-transport.no-CO2')} />;
    }
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Dropdown
        label={t('screens.carbon-transport.dropdown.title')}
        placeholder={t('screens.carbon-transport.dropdown.title')}
        icon={() => <Gasoline style={{ color: Colors.bank.primary.lightGreen }} />}
        data={dataFuel}
        onSelect={handleOnChange}
      />
      {fuel && <View style={styles.container}>{ConditionalForm()}</View>}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
});
