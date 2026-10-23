import { FlatList } from 'react-native';
import { IContact, Phone } from '@clean-rn/contact/domain';
//
import { ContactCard } from '../../cards/contact-card';

type IProps = {
  data: IContact[];
  onPress: (phone: Phone) => void | undefined;
};

export const ContactCardList = (props: IProps) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      pinchGestureEnabled
      data={props.data}
      contentContainerStyle={{ padding: 0 }}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }: { item: IContact; index: number }) => {
        return <ContactCard data={item} idx={index} onPress={props.onPress} />;
      }}
    />
  );
};
