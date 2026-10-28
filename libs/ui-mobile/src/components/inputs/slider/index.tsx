import { Dimensions, StyleSheet, Text, View } from 'react-native';
import RNSlider from '@react-native-community/slider';

import { useTheme } from '@rneui/themed';
import { Colors, FontNames, NEEDS_SMALL_TEXT } from '../../../constants';

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
  const { theme } = useTheme();
  return props.short ? (
    <View style={theme.container.centeredItems}>
      <Text style={[theme.text.darkBlue, styles.labelShortContainer]}>{props.label}</Text>
      <View style={styles.sliderUnitContainer}>
        <Text style={styles.textSlider}>{`${props.value}${props.unit ?? ''}`}</Text>
        <RNSlider
          style={styles.sliderContainer}
          minimumValue={props.minValue}
          maximumValue={props.maxValue}
          value={props.value}
          step={props.step ?? 1}
          thumbTintColor={Colors.secondary.pink}
          onValueChange={props.onChange}
          minimumTrackTintColor={Colors.secondary.pink}
          maximumTrackTintColor={Colors.primary.lightGrey}
        />
      </View>
    </View>
  ) : (
    <View>
      <Text style={[theme.text.label, { color: Colors.secondary.pink }]}>
        {props.label.toLocaleUpperCase()}
      </Text>
      <Text style={[theme.text.darkBlue, styles.text]}>{`${props.value}${props.unit ?? ''}`}</Text>
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
        thumbTintColor={Colors.secondary.pink}
        onValueChange={props.onChange}
        minimumTrackTintColor={Colors.secondary.pink}
        maximumTrackTintColor={Colors.primary.lightGrey}
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
    color: Colors.primary.darkBlue,
    textAlign: 'left',
    fontFamily: FontNames.MartelSans_700Bold,
  },
});
