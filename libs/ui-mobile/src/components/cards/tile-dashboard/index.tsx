import { FC } from 'react';
import { StyleSheet, View, Dimensions, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Skeleton, useTheme } from '@rneui/themed';
import { Colors, FontNames } from '../../../constants';
import { GreenHouse, WhiteEllipse as Ellipse, SunAndCloud } from '../../../assets/svg';

const DASHBOARD_CARD_RATIO_EXTERNAL = 0.2; // ratio hauteur/largeur
const DASHBOARD_CARD_RATIO_INTERNAL = 0.4; // ratio hauteur/largeur

type IProps = {
  text: string;
  kpi: string;
  children?: React.ReactNode;
  loading?: boolean;
  external?: boolean;
  title: string;
};

const circleSize = Platform.OS === 'web' ? 84 : 44;

const TileExternal = (props: IProps) => {
  const { theme } = useTheme();

  // Calcul des dimensions selon la plateforme
  const cardWidth = Dimensions.get('window').width * 0.9;

  const cardHeight = cardWidth * DASHBOARD_CARD_RATIO_EXTERNAL + circleSize;

  return props.loading ? (
    <Skeleton
      LinearGradientComponent={LinearGradient}
      animation="pulse"
      style={[styles.tileContainer, Platform.OS === 'web' && styles.webTileContainer, { height: cardHeight }]}
    />
  ) : (
    <View
      style={[
        theme.container.card.dashboard,
        Platform.OS === 'web' && {
          width: cardWidth,
          alignItems: 'center',
          marginTop: circleSize + 20,
        },
        {
          height: cardHeight,
          backgroundColor: props.external ? Colors.primary.lightGrey : Colors.primary.white,
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            right: (cardWidth - 142) / 2, // 142 est la largeur de l'ellipse
          },
        ]}
      >
        <Ellipse color={Colors.primary.lightGrey} />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 12,
          }}
        >
          <SunAndCloud height={circleSize} />
        </View>
        <View style={{ position: 'absolute', top: 8, left: 42 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: FontNames.MartelSans_400Regular,
              color: Colors.primary.grey,
            }}
          >
            {props.title}
          </Text>
        </View>
      </View>
      <View style={[styles.rowContainer, Platform.OS === 'web' ? { marginVertical: 24 } : {}]}>
        {props.children}
      </View>
    </View>
  );
};

export const TileInternal: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  // Calcul des dimensions selon la plateforme
  const cardWidth = Dimensions.get('window').width * 0.9;

  const cardHeight = cardWidth * DASHBOARD_CARD_RATIO_INTERNAL + circleSize;

  return props.loading ? (
    <Skeleton
      LinearGradientComponent={LinearGradient}
      animation="pulse"
      style={[styles.tileContainer, Platform.OS === 'web' && styles.webTileContainer, { height: cardHeight }]}
    />
  ) : (
    <View
      style={[
        theme.container.card.dashboard,
        Platform.OS === 'web' && {
          width: cardWidth,
          alignItems: 'center',
          marginTop: circleSize + 20,
        },
        {
          height: cardHeight,
          backgroundColor: Colors.primary.white,
        },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            right: (cardWidth - 142) / 2, // 142 est la largeur de l'ellipse
          },
        ]}
      >
        <Ellipse color={Colors.primary.white} />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 12,
          }}
        >
          <GreenHouse height={circleSize} />
        </View>
        <View style={{ position: 'absolute', top: 8, left: 42 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: FontNames.MartelSans_400Regular,
              color: Colors.primary.grey,
            }}
          >
            {props.title}
          </Text>
        </View>
      </View>

      <View style={[styles.rowContainer, Platform.OS === 'web' ? { marginVertical: 24 } : {}]}>
        <Text style={styles.greyText}>{props.text + ' '}</Text>
        <Text style={styles.kpiText}>{props.kpi}</Text>
      </View>
      {props.children}
    </View>
  );
};

export const TileDashboard: FC<IProps> = (props: IProps) => {
  return props.external ? <TileExternal {...props} /> : <TileInternal {...props} />;
};

const styles = StyleSheet.create({
  tileContainer: {
    width: Dimensions.get('window').width * 0.9,
    marginHorizontal: 4,
    backgroundColor: Colors.primary.lightGrey,
    borderRadius: 12,
    alignSelf: 'center',
  },
  webTileContainer: {
    width: 350, // Largeur fixe sur web
    minWidth: 350,
  },
  iconContainer: {
    position: 'absolute',
    top: -circleSize / 2,
  },
  rowContainer: {
    margin: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: Platform.OS === 'web' ? 24 : 8,
  },
  greyText: {
    fontSize: Platform.OS === 'web' ? 39 : 19,
    fontWeight: 'bold',
    fontFamily: FontNames.MartelSans_600SemiBold,
    color: Colors.primary.grey,
  },
  kpiText: {
    fontSize: Platform.OS === 'web' ? 48 : 28,
    fontWeight: 'bold',
    fontFamily: FontNames.MartelSans_600SemiBold,
    color: Colors.primary.grey,
  },
});
