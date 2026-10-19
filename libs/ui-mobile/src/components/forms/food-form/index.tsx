import { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import { FoodE } from '@bank/carbon-weight/dist';

import { Slider } from '../../inputs/slider';

type IProps = {
  initialValues: IFood | null;
  onChangeForm: (form: IFood) => void;
};

type IFood = {
  alcohol: number;
  bread: number;
  cheese: number;
  fish: number;
  harvestExotic: number;
  harvestLocal: number;
  meatRed: number;
  meatWhite: number;
  rice: number;
  soft: number;
};

export const FoodForm = (props: IProps) => {
  const { t } = useTranslation();

  // sliders
  const [slider, setSlider] = useState<IFood>(
    props.initialValues ?? {
      alcohol: 7,
      bread: 7,
      cheese: 7,
      fish: 7,
      harvestExotic: 7,
      harvestLocal: 7,
      meatRed: 7,
      meatWhite: 7,
      rice: 7,
      soft: 7,
    },
  );
  const handleSlider = useCallback(
    (key: keyof typeof FoodE, value: number) => {
      const newForm = {
        ...slider,
        [key]: value,
      };
      setSlider(newForm);
      props.onChangeForm(newForm);
    },
    [slider, props],
  );

  const SliderList = () => {
    return Object.values(FoodE).map((key: keyof typeof FoodE) => {
      return (
        <View key={key} style={styles.sliderContainer}>
          <Slider
            label={t('screens.carbon-food.slider.' + key)}
            minValue={0}
            maxValue={14}
            value={slider[key]}
            onChange={(value: number) => handleSlider(key, value)}
            unit={
              slider[key] < 2 ? t('screens.carbon-food.slider.unit') : t('screens.carbon-food.slider.units')
            }
            short
          />
        </View>
      );
    });
  };

  return <View>{SliderList()}</View>;
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: Dimensions.get('window').width * 0.95,
  },
});
