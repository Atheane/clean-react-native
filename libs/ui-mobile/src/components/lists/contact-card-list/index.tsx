import { VirtualizedList } from 'react-native';
import { ContactCard } from '../../cards/contact-card';

interface IContact {
  id: string;
  name: string;
  phone: Phone;
}

type IProps = {
  data: IContact[];
  onPress: (phone: string) => void | undefined;
};

export const ContactCardList = (props: IProps) => {
  const getItem = (data: IContact[], index: number): IContact => {
    return data[index];
  };

  const getItemCount = (data: IContact[]): number => {
    return data.length;
  };

  return (
    <VirtualizedList
      data={props.data}
      initialNumToRender={10} // Ajustez le nombre initial d'éléments à rendre
      renderItem={({ item, index }) => <ContactCard data={item} idx={index} onPress={props.onPress} />}
      keyExtractor={(item) => item.id}
      getItemCount={getItemCount}
      getItem={getItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 0 }}
    />
  );
};
