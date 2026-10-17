import { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ImageSourcePropType } from 'react-native';
import { getLocales } from 'expo-localization';

import {
  HeaderBad,
  HeaderChampion,
  HeaderCop21,
  HeaderFrance,
  BilanBadFR,
  BilanBadEN,
  BilanChampionFR,
  BilanChampionEN,
  BilanCop21FR,
  BilanCop21EN,
  BilanFranceFR,
  BilanFranceEN,
} from '../../assets';
import { Colors, FontNames } from '../../constants';

type IProps = {
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

const Headers = {
  [ICategories.BAD]: HeaderBad as ImageSourcePropType,
  [ICategories.FRANCE]: HeaderFrance as ImageSourcePropType,
  [ICategories.CHAMPION]: HeaderChampion as ImageSourcePropType,
  [ICategories.COP21]: HeaderCop21 as ImageSourcePropType,
} as { [key: string]: ImageSourcePropType };

const Bilans = {
  FR: {
    [ICategories.BAD]: BilanBadFR as ImageSourcePropType,
    [ICategories.FRANCE]: BilanFranceFR as ImageSourcePropType,
    [ICategories.CHAMPION]: BilanChampionFR as ImageSourcePropType,
    [ICategories.COP21]: BilanCop21FR as ImageSourcePropType,
  } as { [key: string]: ImageSourcePropType },
  GB: {
    [ICategories.BAD]: BilanBadEN as ImageSourcePropType,
    [ICategories.FRANCE]: BilanFranceEN as ImageSourcePropType,
    [ICategories.CHAMPION]: BilanChampionEN as ImageSourcePropType,
    [ICategories.COP21]: BilanCop21EN as ImageSourcePropType,
  } as { [key: string]: ImageSourcePropType },
  US: {
    [ICategories.BAD]: BilanBadEN as ImageSourcePropType,
    [ICategories.FRANCE]: BilanFranceEN as ImageSourcePropType,
    [ICategories.CHAMPION]: BilanChampionEN as ImageSourcePropType,
    [ICategories.COP21]: BilanCop21EN as ImageSourcePropType,
  } as { [key: string]: ImageSourcePropType },
};

const locales = getLocales();
const country = locales[0]?.regionCode || undefined;

const toCO2 = (value: number) => {
  return `${(value / 1000).toFixed(2).replace('.', ',')} tCO2`;
};

export const GraphCO2 = (props: IProps) => {
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
    <View style={styles.container}>
      {category && (
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{toCO2(props.emissions)}</Text>
          </View>
          <Image source={Headers[category]} resizeMode="contain" style={styles.headerImage} />
        </View>
      )}
      {country && category && Bilans[country as keyof typeof Bilans] && (
        <View style={styles.imageContainer}>
          <Image
            source={Bilans[country as keyof typeof Bilans][category]}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    top: 120,
    zIndex: 1,
  },
  text: {
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 40,
    color: Colors.text.white,
  },
  imageContainer: {
    position: 'relative',
    top: -80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow.bold,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  headerImage: {
    width: Dimensions.get('window').width * 0.9,
  },
  bodyImage: {
    width: Dimensions.get('window').width * 0.8,
  },
});
