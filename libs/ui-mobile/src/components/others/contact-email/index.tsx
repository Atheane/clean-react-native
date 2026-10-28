import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@rneui/themed';

import { BlueMail } from '../../../assets';
import { Colors } from '../../../constants';

type IProps = {
  subject: string;
  body: string;
  label: string;
  co2: string;
};

export const ContactEmail = (props: IProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(`mailto:contact@example.com?subject=${props.subject}&body=${props.body}`)
      }
    >
      <View style={styles.rowContainer}>
        <BlueMail />
        <View style={styles.textContainer}>
          <Text style={theme.text.darkBlue}>{props.label}</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={theme.text.boldDarkBlue}>{props.co2}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  textContainer: {
    marginLeft: 12,
  },
  tooltipContainer: {
    backgroundColor: Colors.primary.white,
    width: '100%',
  },
  tooltipText: {
    color: Colors.primary.lightGreen,
    textAlign: 'left',
  },
});
