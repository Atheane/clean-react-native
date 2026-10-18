import { FC } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@rneui/themed';

import { Colors, FontNames } from '../../../constants';
import { firstLetterCapitalize } from '../../../utils';

type IProps = {
  title: string;
  large?: boolean;
  uppercase?: boolean;
  iconOne?: React.FC<SvgProps>;
  iconTwo?: React.FC<SvgProps>;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
};

export const PrimaryButton: FC<IProps> = (props: IProps) => {
  return (
    <View style={props.large ? styles.containerLarge : styles.container}>
      <Button
        ViewComponent={LinearGradient}
        style={styles.buttonContainer}
        buttonStyle={styles.button}
        loading={props?.loading ?? false}
        linearGradientProps={{
          colors: [Colors.bank.greenGradient.lightGreen, Colors.bank.greenGradient.darkGreen],
          start: [0, 1],
          end: [1, 0],
        }}
        onPress={props.onPress}
        disabled={props.disabled}
        raised
      >
        <View style={styles.contentContainer}>
          {props.iconOne && (
            <View style={styles.iconOneContainer}>
              <props.iconOne />
            </View>
          )}
          <Text style={[styles.content, { textTransform: props.uppercase ? 'uppercase' : 'none' }]}>
            {firstLetterCapitalize(props.title)}
          </Text>
          {props.iconTwo && (
            <View style={styles.iconTwoContainer}>
              <props.iconTwo />
            </View>
          )}
        </View>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containerLarge: {
    width: Dimensions.get('window').width * 0.8,
    height: 55,
  },
  buttonContainer: {
    shadowColor: Colors.shadow.bold, // iOS
    shadowOffset: { width: 0, height: 15 }, // iOS
    shadowOpacity: 0.6, // iOS
    shadowRadius: 20, // iOS
    elevation: 50, // android,
    borderRadius: 50,
  },
  button: {
    paddingTop: 15,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 26,
    textTransform: 'uppercase',
    fontFamily: FontNames.MartelSans_600SemiBold,
    fontSize: 18,
    lineHeight: 24,
    radius: 28,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    lineHeight: 24,
    fontSize: 18,
    color: Colors.bank.primary.white,
    fontFamily: FontNames.Roboto_700Bold,
  },
  iconOneContainer: {
    marginRight: 15,
  },
  iconTwoContainer: {
    marginLeft: 15,
  },
});
