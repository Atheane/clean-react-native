import { Dimensions, StyleSheet, Text, View } from 'react-native';
import RNSlider from '@react-native-community/slider';

import { Colors, FontNames } from '../../../constants';

type IProps = {
  label: string;
  minValue: number;
  maxValue: number;
  step?: number;
  unit?: string;
  short?: boolean;
  value: number;
  onChange: (value: number) => void;
};

export const Slider = (props: IProps) => {
  return props.short ? (
    <View style={styles(props).container}>
      <Text style={styles(props).labelShort}>{props.label}</Text>
      <View style={styles(props).sliderUnitContainer}>
        <Text style={styles(props).textShort}>{`${props.value}${props.unit ?? ''}`}</Text>
        <RNSlider
          style={styles(props).sliderContainer}
          minimumValue={props.minValue}
          maximumValue={props.maxValue}
          value={props.value}
          step={props.step ?? 1}
          thumbTintColor={Colors.bank.secondary.pink}
          onValueChange={props.onChange}
          minimumTrackTintColor={Colors.bank.secondary.pink}
          maximumTrackTintColor={Colors.bank.primary.lightGrey}
        />
      </View>
    </View>
  ) : (
    <View>
      <Text style={styles(props).label}>{props.label.toLocaleUpperCase()}</Text>
      <Text style={styles(props).text}>{`${props.value}${props.unit ?? ''}`}</Text>
      <RNSlider
        style={styles(props).sliderContainer}
        minimumValue={props.minValue}
        maximumValue={props.maxValue}
        value={props.value}
        step={props.step ?? 1}
        thumbTintColor={Colors.bank.secondary.pink}
        onValueChange={props.onChange}
        minimumTrackTintColor={Colors.bank.secondary.pink}
        maximumTrackTintColor={Colors.bank.primary.lightGrey}
      />
    </View>
  );
};

const styles = (props: IProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    sliderContainer: {
      width: props.short ? Dimensions.get('window').width * 0.35 : Dimensions.get('window').width * 0.8,
      marginTop: 4,
    },
    sliderUnitContainer: {
      marginLeft: 12,
    },
    labelShort: {
      color: Colors.bank.primary.darkBlue,
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: 18,
      width: '60%',
      paddingTop: 20,
    },
    label: {
      color: Colors.bank.secondary.pink,
      fontFamily: FontNames.Roboto_700Bold,
      fontSize: 18,
      lineHeight: 24,
    },
    textShort: {
      textAlign: 'center',
      color: Colors.bank.primary.darkBlue,
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: 15,
      lineHeight: 20,
      paddingTop: 16,
    },
    text: {
      textAlign: 'center',
      color: Colors.bank.primary.darkBlue,
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: 18,
      lineHeight: 24,
      paddingTop: 16,
    },
  });
