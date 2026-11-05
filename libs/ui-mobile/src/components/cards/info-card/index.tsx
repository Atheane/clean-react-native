import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { useTheme } from '@rneui/themed';

import { Light } from '../../../assets/svg';
import { Colors, FontNames } from '../../../constants';

type IProps = {
  title: string;
  text?: string;
};

const KPI_CARD_RATIO = 278 / 340;

export const InfoCard = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <View>
      <View style={Platform.OS === 'web' ? styles.webShadow : [styles.card, styles.shadow]}>
        <View style={styles.subContainer}>
          <Light />
          <Text style={[styles.text]}>{props.title}</Text>
        </View>
        {props.text && (
          <View style={styles.textContainer}>
            <Text style={[styles.text, theme.text.grey]}>{props.text}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    paddingTop: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'relative',
    top: -16,
    left: -10,
    width: 24,
    height: 24,
    marginBottom: -30,
  },
  text: {
    top: 10,
    left: 6,
    fontSize: 19,
    fontFamily: FontNames.MartelSans_600SemiBold,
    color: Colors.primary.darkGrey,
  },
  webShadow: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    minHeight: Dimensions.get('window').width * 0.9 * KPI_CARD_RATIO * 0.5,
    borderRadius: 28,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: 500,
  },
  textContainer: {
    paddingHorizontal: 12,
  },
  card: {
    width: Dimensions.get('window').width * 0.9,
    height: (Dimensions.get('window').width * 0.9 * 278) / 340,
    margin: 16,
    borderRadius: 16,
    borderWidth: 0,
    backgroundColor: Colors.primary.white,
  },
  shadow: {
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
