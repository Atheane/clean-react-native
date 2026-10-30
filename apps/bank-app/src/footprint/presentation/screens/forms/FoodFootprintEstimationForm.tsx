import { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { Slider } from '@clean-rn/ui-mobile';

type IProps = {
  initialValues: IFood | null;
  onChangeForm: (form: IFood) => void;
};

type IFood = {
  meatRed: number;
  meatWhite: number;
  fish: number;
  cheese: number;
  harvestLocal: number;
  harvestExotic: number;
  rice: number;
  bread: number;
  alcohol: number;
  soft: number;
};
enum FoodE {
  meatRed = 'meatRed',
  meatWhite = 'meatWhite',
  fish = 'fish',
  cheese = 'cheese',
  harvestLocal = 'harvestLocal',
  harvestExotic = 'harvestExotic',
  rice = 'rice',
  bread = 'bread',
  alcohol = 'alcohol',
  soft = 'soft',
}

export const FoodFootprintEstimationForm = (props: IProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // sliders
  const [slider, setSlider] = useState<IFood>(
    props.initialValues ?? {
      meatRed: 7,
      meatWhite: 7,
      fish: 7,
      cheese: 7,
      harvestLocal: 7,
      harvestExotic: 7,
      rice: 7,
      bread: 7,
      alcohol: 7,
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
            label={t('screens.footprint-estimation-food.slider.' + key)}
            minValue={0}
            maxValue={14}
            value={slider[key]}
            onChange={(value: number) => handleSlider(key, value)}
            unit={
              slider[key] < 2
                ? t('screens.footprint-estimation-food.slider.unit')
                : t('screens.footprint-estimation-food.slider.units')
            }
            short
          />
        </View>
      );
    });
  };

  return <View style={[styles.container, theme.container.centeredItem]}>{SliderList()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    width: Dimensions.get('window').width * 0.9,
    marginVertical: 8,
    marginLeft: 12,
  },
});
