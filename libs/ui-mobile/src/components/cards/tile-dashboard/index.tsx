import { FC } from 'react';
import { StyleSheet, View, Dimensions, Text, Platform } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Colors, FontNames } from '../../../constants';
import { HomeWhiteCircle } from '../../../assets/svg';

// Constantes pour le web
const DASHBOARD_CARD_RATIO = 0.4; // ratio hauteur/largeur

type IProps = {
  text: string;
  kpi: string;
  children?: React.ReactNode;
};

const circleSize = Platform.OS === 'web' ? 84 : 44;

export const TileDashboard: FC<IProps> = (props: IProps) => {
  const { theme } = useTheme();

  // Calcul des dimensions selon la plateforme
  const cardWidth = Dimensions.get('window').width * 0.9;

  const cardHeight = cardWidth * DASHBOARD_CARD_RATIO;

  return (
    <View
      style={[
        theme.container.card.dashboard,
        Platform.OS === 'web' && {
          width: cardWidth,
          height: cardHeight,
          alignItems: 'center',
          marginTop: circleSize + 20,
        },
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
