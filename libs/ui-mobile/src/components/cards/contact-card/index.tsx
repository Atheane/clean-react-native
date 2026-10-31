import React, { memo, useCallback } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants';
import { ContactItem } from '../../items/contact-item';
import { PhoneBg } from '../../../assets';
import { PhoneNumberUtil } from 'google-libphonenumber';

export interface IContact {
  id: string;
  name: string;
  phone: { phoneUtil: PhoneNumberUtil; numberProto: any; ountryCode: string };
}

export const ContactCard = memo(({ data, idx, onPress }: IProps) => {
  const isEven = idx % 2 === 0;
  const icon = isEven
    ? () => (
        <PhoneBg
          backgroundColor={Colors.primary.white}
          endColor={Colors.secondary.pink}
          startColor={Colors.primary.darkBlue}
        />
      )
    : () => (
        <PhoneBg
          backgroundColor={Colors.primary.lightGrey}
          endColor={Colors.secondary.pink}
          startColor={Colors.primary.darkBlue}
        />
      );
  const containerStyle = [styles.contactContainer, isEven ? styles.evenContainer : styles.oddContainer];

  const handlePress = useCallback(
    (phone: string) => {
      if (onPress) {
        onPress(phone);
      }
    },
    [onPress],
  );

  return onPress ? (
    <TouchableOpacity style={containerStyle} onPress={() => onPress(data.phone.valueInternational)}>
      {data.phone && (
        <ContactItem
          icon={icon}
          name={data.name}
          phone={data.phone.valueInternational}
          onPress={handlePress}
        />
      )}
    </TouchableOpacity>
  ) : (
    <View style={containerStyle}>
      {data.phone && <ContactItem icon={icon} name={data.name} phone={data.phone.valueInternational} />}
    </View>
  );
});

const styles = StyleSheet.create({
  contactContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 72,
    width: Dimensions.get('window').width,
  },
  evenContainer: {
    backgroundColor: Colors.primary.lightGrey,
  },
  oddContainer: {
    backgroundColor: Colors.primary.white,
  },
});

type IProps = {
  data: IContact;
  idx: number;
  onPress?: (phoneNumber: string) => void;
};
