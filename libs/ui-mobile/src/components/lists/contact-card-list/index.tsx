import { FlatList } from 'react-native';
import { IContact } from '@clean-rn/contact/domain';
//
import { ContactCard } from '../../cards/contact-card';

type IProps = {
  data: IContact[];
};

export const ContactCardList = (props: IProps) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      pinchGestureEnabled
      data={props.data}
      contentContainerStyle={{ padding: 0 }}
      keyExtractor={(item) => item.name + item.phone}
      renderItem={({ item, index }: { item: IContact; index: number }) => {
        if (item.phone.length === 0) return null;
        return <ContactCard data={item} idx={index} />;
      }}
    />
  );
};
