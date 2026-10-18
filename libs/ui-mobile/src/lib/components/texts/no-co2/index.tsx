import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { Colors, FontNames } from '../../../constants';

type IProps = {
  text: string;
};

export const NoCO2 = (props: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.8,
  },
  text: {
    fontFamily: FontNames.Roboto_400Regular,
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 19,
    color: Colors.bank.primary.darkBlue,
  },
});
