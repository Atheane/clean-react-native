import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontNames } from '../../../constants';

type IProps = {
  digits: number[];
  underlined?: boolean;
  hidden?: boolean;
};

export const Secured4Digits = (props: IProps) => {
  return (
    <View style={styles.container}>
      {props.digits.map((digit, index) => (
        <View
          key={index}
          style={[
            styles.digitContainer,
            props.underlined &&
              !props.hidden && { borderBottomWidth: 1, borderBottomColor: Colors.bank.secondary.purple },
          ]}
        >
          {props.hidden && <Text style={styles.digit}>{'*'}</Text>}
          {!props.hidden && <Text style={styles.digit}>{digit}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  digitContainer: {
    width: 30,
    height: 60,
    backgroundColor: Colors.bank.primary.white,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  digit: {
    color: Colors.bank.secondary.purple,
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 36,
    lineHeight: 36,
    textAlign: 'center',
  },
});
