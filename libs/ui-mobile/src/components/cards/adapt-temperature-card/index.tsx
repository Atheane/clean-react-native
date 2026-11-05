import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { Colors, FontNames } from '../../../constants';
import { Plus, Minus } from '../../../assets/svg';

type IProps = {
  text: string;
  comment: string;
  price: number | null;
  kwh: number | null;
  onPlusPress: () => void;
  onMinusPress: () => void;
  degree: number;
};

export const AdaptTemperatureCard = ({
  text,
  kwh,
  price,
  degree,
  comment,
  onPlusPress,
  onMinusPress,
}: IProps) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.pill,
          { backgroundColor: degree > 0 ? Colors.secondary.salmon : Colors.primary.green },
        ]}
      >
        <TouchableOpacity style={{ paddingTop: 4 }} onPress={onPlusPress}>
          <Plus color={Colors.primary.darkBlue} />
        </TouchableOpacity>
        <Text style={styles.pillText}>{`${degree} C°`}</Text>
        <TouchableOpacity style={{ paddingTop: 4 }} onPress={onMinusPress}>
          <Minus color={Colors.primary.darkBlue} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}>{text}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text
            style={styles.priceText}
          >{`${degree > 0 ? '+' : ''} ${price === null ? '...' : (price * degree).toFixed(1).toString().replace('.', ',')}€ / mois`}</Text>
          <Text
            style={styles.priceText}
          >{`${degree > 0 ? '+' : ''} ${kwh === null ? '...' : (kwh * degree).toString()} kWh / mois`}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.whiteText}>{comment}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.85,
    alignSelf: 'center',
    marginTop: 20,
  },
  pill: {
    width: 209,
    height: 61,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    flexDirection: 'row',
    zIndex: 1,
  },
  pillText: {
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontSize: 26,
    color: Colors.primary.white,
    fontWeight: 'bold',
  },
  card: {
    width: 340,
    height: 340,
    backgroundColor: Colors.secondary.darkBlue,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    paddingTop: 36,
  },
  whiteText: {
    fontFamily: FontNames.MartelSans_600SemiBold,
    fontSize: 18,
    color: Colors.primary.white,
    textAlign: 'center',
    lineHeight: 28,
    width: Dimensions.get('window').width * 0.7,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  priceContainer: {
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
    backgroundColor: Colors.primary.darkWhite,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 16,
  },
  priceText: {
    fontFamily: FontNames.MartelSans_800ExtraBold,
    fontSize: 16,
    color: Colors.primary.darkBlue,
    fontWeight: 'bold',
  },
});
