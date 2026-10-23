import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import { BlueMail } from '../../../assets';
import { Colors } from '../../../constants';

type IProps = {
  subject: string;
  body: string;
};

export const ContactEmail = (props: IProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() =>
        Linking.openURL(`mailto:contact@example.com?subject=${props.subject}&body=${props.body}`)
      }
    >
      <View style={styles.rowContainer}>
        <BlueMail />
        <View style={styles.textContainer}>
          <Text style={theme.bank.text.darkBlue}>{t('contact-email.label')}</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={theme.bank.text.boldDarkBlue}>{t('contact-email.bank')}</Text>
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
    backgroundColor: Colors.bank.primary.white,
    width: '100%',
  },
  tooltipText: {
    color: Colors.bank.primary.lightGreen,
    textAlign: 'left',
  },
});
