import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ImageSourcePropType } from 'react-native';
import { getLocales } from 'expo-localization';

import { useTheme } from '@rneui/themed';
import { Colors } from 'libs/ui-mobile/src/constants';

type IProps = {
  headers: { [key: string]: ImageSourcePropType };
  bilans: { [key: string]: { [key: string]: ImageSourcePropType } };
  emissions: number;
  small?: boolean; // Ajout de cette prop
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
const country = () => {
  const countryLocale = locales[0]?.regionCode || 'GB';
  if (!['FR', 'GB', 'US'].includes(countryLocale)) {
    return 'GB';
  }
  return countryLocale;
};

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
    <View
      style={[
        styles.container,
        theme.container.centeredItem,
        {
          height: props.small ? 380 : 350,
          marginTop: props.small ? -80 : -20,
          marginBottom: props.small ? 0 : 60,
        },
      ]}
    >
      {category && (
        <View>
          <View style={[styles.textContainer, theme.container.centeredItem]}>
            <Text style={theme.text.whiteGraphTitle}>{toCO2(props.emissions)}</Text>
          </View>
          <Image
            source={props.headers[category]}
            resizeMode="contain"
            style={{
              width: Dimensions.get('window').width * (props.small ? 0.8 : 0.9),
            }}
          />
        </View>
      )}
      {country && category && props.bilans[country() as keyof typeof props.bilans] && (
        <View
          style={[
            styles.imageContainer,
            theme.container.centeredItem,
            {
              height: props.small ? 200 : 240,
            },
          ]}
        >
          <Image
            source={props.bilans[country() as keyof typeof props.bilans][category]}
            resizeMode="contain"
            style={{
              width: Dimensions.get('window').width * (props.small ? 0.7 : 0.8),
              marginHorizontal: 20,
            }}
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
    backgroundColor: Colors.primary.lightGrey,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
