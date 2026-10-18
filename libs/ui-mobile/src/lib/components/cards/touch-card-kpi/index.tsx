import { FC } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Colors, FontNames } from '../../../constants';

type IProps = {
  data?: { pct: string; co2: string; legend: string };
  icon: React.FC<SvgProps>;
  onPress: () => void;
};

export const TouchCardKpi: FC<IProps> = (props: IProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles(props).container}>
      <View style={styles(props).subContainer}>
        <View style={styles(props).rowContainer}>
          <props.icon />
          {props.data && (
            <View style={styles(props).kpiContainer}>
              <Text style={styles(props).pctText}>{props.data.pct}</Text>
              <Text style={styles(props).subtitleText}>{props.data.co2}</Text>
            </View>
          )}
        </View>
        {props.data && <Text style={styles(props).legendText}>{props.data.legend}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const CARD_RATIO = 174 / 112;

const styles = (props: IProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.bank.primary.white,
      width: Dimensions.get('window').width * 0.46,
      height: (Dimensions.get('window').width * 0.46) / CARD_RATIO,
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
      width: Dimensions.get('window').width * 0.46,
      height: (Dimensions.get('window').width * 0.46) / CARD_RATIO,
      borderRadius: 20,
      padding: 8,
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 16,
      marginTop: props.data ? 0 : 16,
    },
    kpiContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    pctText: {
      fontFamily: FontNames.Roboto_700Bold,
      fontSize: 36,
      color: Colors.bank.primary.darkBlue,
      lineHeight: 48,
      marginLeft: 8,
    },
    subtitleText: {
      fontFamily: FontNames.Roboto_700Bold,
      fontSize: 12,
      color: Colors.bank.primary.darkGrey,
      marginVertical: -6,
      marginLeft: 8,
    },
    legendText: {
      fontFamily: FontNames.Roboto_400Regular,
      fontSize: 11,
      color: Colors.bank.primary.grey,
      lineHeight: 15,
      marginTop: 16,
      marginLeft: 8,
      textAlign: 'center',
    },
  });
