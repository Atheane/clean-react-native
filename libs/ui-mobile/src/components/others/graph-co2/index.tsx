import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ImageSourcePropType } from 'react-native';
import { getLocales } from 'expo-localization';

import { useTheme } from '@rneui/themed';

type IProps = {
  headers: { [key: string]: ImageSourcePropType };
  bilans: { [key: string]: { [key: string]: ImageSourcePropType } };
  emissions: number;
};

enum ICategories {
  BAD = 'bad',
  FRANCE = 'france',
  CHAMPION = 'champion',
  COP21 = 'cop21',
}

const THRESHOLDS = {
  [ICategories.FRANCE]: 4580,
  [ICategories.CHAMPION]: 1340,
  [ICategories.COP21]: 730,
} as { [key: string]: number };

const locales = getLocales();
const country = locales[0]?.regionCode || undefined;

const toCO2 = (value: number) => {
  return `${(value / 1000).toFixed(2).replace('.', ',')} tCO2`;
};

export const GraphCO2 = (props: IProps) => {
  const { theme } = useTheme();
  const [category, setCategory] = useState<ICategories>(ICategories.COP21);

  useEffect(() => {
    if (props.emissions > THRESHOLDS[ICategories.FRANCE]) {
      setCategory(ICategories.BAD);
    } else if (props.emissions > THRESHOLDS[ICategories.CHAMPION]) {
      setCategory(ICategories.FRANCE);
    } else if (props.emissions > THRESHOLDS[ICategories.COP21]) {
      setCategory(ICategories.CHAMPION);
    } else {
      setCategory(ICategories.COP21);
    }
  }, [props.emissions]);

  return (
    <View style={[styles.container, theme.container.centeredItem]}>
      {category && (
        <View>
          <View style={[styles.textContainer, theme.container.centeredItem]}>
            <Text style={theme.text.whiteGraphTitle}>{toCO2(props.emissions)}</Text>
          </View>
          <Image source={props.headers[category]} resizeMode="contain" style={styles.headerImage} />
        </View>
      )}
      {country && category && props.bilans[country as keyof typeof props.bilans] && (
        <View style={[styles.imageContainer, theme.shadow.card, theme.container.centeredItem]}>
          <Image
            source={props.bilans[country as keyof typeof props.bilans][category]}
            resizeMode="contain"
            style={styles.bodyImage}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    height: Dimensions.get('window').height * 0.6,
  },
  textContainer: {
    position: 'relative',
    top: 120,
    zIndex: 1,
  },
  imageContainer: {
    position: 'relative',
    top: -80,
  },
  headerImage: {
    width: Dimensions.get('window').width * 0.9,
  },
  bodyImage: {
    width: Dimensions.get('window').width * 0.8,
  },
});
