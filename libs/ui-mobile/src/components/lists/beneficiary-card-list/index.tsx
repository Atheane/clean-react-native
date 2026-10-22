import { FlatList } from 'react-native';
import { IBeneficiary } from '@clean-rn/beneficiary/domain';
//
import { BeneficiaryCard } from '../../cards/beneficiary-card';

type IProps = {
  data: IBeneficiary[];
};

export const BeneficiaryCardList = (props: IProps) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      pinchGestureEnabled
      data={props.data}
      contentContainerStyle={{ padding: 0 }}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }: { item: IBeneficiary; index: number }) => (
        <BeneficiaryCard data={item} idx={index} />
      )}
    />
  );
};
