import { View, Text, StyleSheet } from 'react-native';
import { Thermometer, Flowers } from '../../../assets/svg';
import { Colors, FontNames } from '../../../constants';

type IProps = {
  kwh: number | null;
  price: number | null;
  legend: string;
};

export const TemperatureCard = ({ kwh, price, legend }: IProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftContainer}>
        <Thermometer />
        <View style={styles.subThermometer}>
          <Text style={styles.subThermometerText}>{`+1C°`}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.kwhContainer}>
          <Text style={styles.numberText}>{`+ ${kwh === null ? '...' : kwh.toString()}`}</Text>
          <Text style={styles.unitText}>{' kWh'}</Text>
        </View>
        <View style={styles.kwhContainer}>
          <Text
            style={styles.numberText}
          >{`+ ${price === null ? '...' : price.toFixed(1).toString().replace('.', ',')}€`}</Text>
        </View>
        <View style={styles.kwhContainer}>
          <Text style={styles.legendText}>{legend}</Text>
        </View>
      </View>
      <View style={styles.flowersContainer}>
        <Flowers />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 340,
    height: 139,
    backgroundColor: Colors.secondary.darkBlue,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  subThermometer: {
    backgroundColor: Colors.primary.darkWhite,
    opacity: 0.9,
    borderRadius: 20,
    width: 88,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  subThermometerText: {
    fontSize: 24,
    color: Colors.secondary.salmon,
    fontFamily: FontNames.MartelSans_700Bold,
  },
  leftContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  rightContainer: {
    marginTop: 24,
    marginRight: 20,
  },
  priceText: {
    fontSize: 24,
    color: Colors.primary.white,
    fontFamily: FontNames.MartelSans_700Bold,
  },
  kwhContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: -12,
  },
  numberText: {
    fontSize: 32,
    color: Colors.primary.white,
    fontFamily: FontNames.MartelSans_700Bold,
  },
  unitText: {
    fontSize: 20,
    color: Colors.primary.white,
    fontFamily: FontNames.MartelSans_700Bold,
  },
  legendText: {
    fontSize: 20,
    color: Colors.primary.white,
    fontFamily: FontNames.MartelSans_700Bold,
    marginLeft: 20,
    marginTop: 10,
  },
  flowersContainer: {
    position: 'absolute',
    bottom: -70,
    right: -40,
  },
});
