import { FC } from 'react';
import { StyleSheet, View, Dimensions, Text, Platform } from 'react-native';
import { Skeleton, useTheme } from '@rneui/themed';
import { Colors, FontNames } from '../../../constants';
import { HomeWhiteCircle } from '../../../assets/svg';
import { LinearGradient } from 'expo-linear-gradient';

const DASHBOARD_CARD_RATIO = 0.4; // ratio hauteur/largeur

type IProps = {
  text: string;
  kpi: string;
  children?: React.ReactNode;
  loading?: boolean;
};

const circleSize = Platform.OS === 'web' ? 84 : 44;

export const TileDashboard: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  // Calcul des dimensions selon la plateforme
  const cardWidth = Dimensions.get('window').width * 0.9;

  const cardHeight =
    props.children === null
      ? (cardWidth * DASHBOARD_CARD_RATIO) / 1.5 + circleSize / 2
      : cardWidth * DASHBOARD_CARD_RATIO + circleSize;

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
        { height: cardHeight },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            right: (cardWidth - 57) / 2, // 57 est la largeur de l'icône
          },
        ]}
      >
        <HomeWhiteCircle width={circleSize} height={circleSize} />
      </View>
      <View style={[styles.rowContainer, Platform.OS === 'web' ? { marginVertical: 24 } : {}]}>
        <Text style={styles.greyText}>{props.text + ' '}</Text>
        <Text style={styles.kpiText}>{props.kpi}</Text>
      </View>
      {props.children}
    </View>
  );
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
    color: Colors.primary.lightGreen,
  },
});
