import { Dimensions, StyleSheet, View } from 'react-native';
import { IContact, Phone } from '@clean-rn/contact/domain';
import { Colors } from '../../../constants';
import { ContactItem } from '../../items/contact-item';
import { PhoneGradientGreyBg, PhoneGradientWhiteBg } from '../../../assets';

type IProps = {
  data: IContact;
  idx: number;
  onPress?: (phoneNumber: Phone) => void;
};

export const ContactCard = (props: IProps) => {
  return (
    <View
      style={
        props.idx % 2 === 0
          ? [styles.contactContainer, styles.evenContainer]
          : [styles.contactContainer, styles.oddContainer]
      }
    >
      <View>
        {props.data.phone && (
          <ContactItem
            icon={props.idx % 2 === 0 ? PhoneGradientWhiteBg : PhoneGradientGreyBg}
            name={props.data.name}
            phone={props.data.phone.valueInternational}
            onPress={props.onPress ? () => props.onPress(props.data.phone) : undefined}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 72,
    width: Dimensions.get('window').width,
  },
  evenContainer: {
    backgroundColor: Colors.bank.primary.lightGrey,
  },
  oddContainer: {
    backgroundColor: Colors.bank.primary.white,
  },
});
