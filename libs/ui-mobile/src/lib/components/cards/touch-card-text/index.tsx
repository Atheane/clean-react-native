import { FC } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Colors, FontNames } from '../../../constants';

type IProps = {
  text: string;
  onPress: () => void;
};

export const TouchCardText: FC<IProps> = (props: IProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CARD_RATIO = 174 / 112;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bank.primary.white,
    width: Dimensions.get('window').width * 0.45,
    height: (Dimensions.get('window').width * 0.45) / CARD_RATIO,
    borderRadius: 20,
    shadowColor: Colors.bank.shadow,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  subContainer: {
    backgroundColor: Colors.bank.primary.white,
    width: Dimensions.get('window').width * 0.45,
    height: (Dimensions.get('window').width * 0.45) / CARD_RATIO,
    borderRadius: 20,
  },
  text: {
    padding: 16,
    marginTop: 8,
    fontFamily: FontNames.MartelSans_400Regular,
    fontSize: 16,
    color: Colors.bank.primary.darkBlue,
    lineHeight: 22,
    textAlign: 'center',
  },
});
