import { Dimensions, StyleSheet, View } from 'react-native';
import { IContact } from '@clean-rn/contact/domain';
import { Colors } from '../../../constants';
import { ContactItem } from '../../items/contact-item';
import { PhoneGradientGreyBg, PhoneGradientWhiteBg } from '../../../assets';

type IProps = {
  data: IContact;
  idx: number;
};

export const ContactCard = (props: IProps) => {
  return (
    <View style={props.idx % 2 ? [styles.contactContainer, styles.oddContainer] : styles.contactContainer}>
      <View key={props.data.name}>
        {props.data.phone.length > 0 && (
          <ContactItem
            icon={props.idx % 2 ? PhoneGradientWhiteBg : PhoneGradientGreyBg}
            name={props.data.name}
            phone={props.data.phone}
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
  oddContainer: {
    backgroundColor: Colors.bank.primary.lightGrey,
  },
});
