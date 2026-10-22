import { StyleSheet, View } from 'react-native';
import { Card } from '@rneui/base';
//
import { IContact } from '@clean-rn/contact/domain';
//
import { Colors } from '../../../constants';
import { ContactItem } from '../../items/contact-item';
import { Phone } from '../../../assets';

type IProps = {
  data: IContact;
  idx: number;
};

export const ContactCard = (props: IProps) => {
  return (
    <Card
      containerStyle={
        props.idx % 2 ? styles.contactContainer : [styles.contactContainer, styles.oddContainer]
      }
    >
      <View key={props.data.name}>
        {props.data.phone.length > 0 && (
          <ContactItem icon={Phone} name={props.data.name} phone={props.data.phone} />
        )}
        {!props.data.phone.length && <ContactItem name={props.data.name} phone={props.data.phone} />}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    marginHorizontal: 0,
    marginVertical: 0,
    height: 70,
  },
  oddContainer: {
    backgroundColor: Colors.bank.primary.lightGrey,
  },
});
