import { Dimensions, StyleSheet, Text, View } from 'react-native';
import RNSlider from '@react-native-community/slider';
import { getDeviceId, getBrand } from 'react-native-device-info';

import { useTheme } from '@rneui/themed';
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

const brand = getBrand();
const model = getDeviceId();

const NEEDS_SMALL_TEXT = brand === 'OPPO' && model === 'lahaina';

export const Slider = (props: IProps) => {
  const { theme } = useTheme();
  return props.short ? (
    <View style={theme.bank.container.centeredItems}>
      <Text style={[theme.bank.text.darkBlue, styles.labelShortContainer]}>{props.label}</Text>
      <View style={styles.sliderUnitContainer}>
        <Text style={styles.textSlider}>{`${props.value}${props.unit ?? ''}`}</Text>
        <RNSlider
          style={styles.sliderContainer}
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
      <Text style={[theme.bank.text.label, { color: Colors.bank.secondary.pink }]}>
        {props.label.toLocaleUpperCase()}
      </Text>
      <Text style={[theme.bank.text.darkBlue, styles.text]}>{`${props.value}${props.unit ?? ''}`}</Text>
      <RNSlider
        style={[
          {
            width: props.short
              ? Dimensions.get('window').width * 0.35
              : Dimensions.get('window').width * 0.75,
          },
          styles.sliderContainer,
        ]}
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

const styles = StyleSheet.create({
  sliderContainer: {
    marginTop: 4,
  },
  sliderUnitContainer: {
    width: Dimensions.get('window').width * 0.3,
    marginLeft: 12,
  },
  labelShortContainer: {
    width: Dimensions.get('window').width * 0.6,
    paddingTop: 20,
  },
  text: {
    textAlign: 'center',
    paddingTop: 16,
  },
  textSlider: {
    fontSize: NEEDS_SMALL_TEXT ? 12 : 13,
    fontWeight: 'bold',
    color: Colors.bank.primary.darkBlue,
    textAlign: 'left',
    fontFamily: FontNames.MartelSans_700Bold,
  },
});
