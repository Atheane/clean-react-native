import { FlatList, View, StyleSheet } from 'react-native';
import { IBeneficiary } from '@clean-rn/beneficiary/domain';

import { BeneficiaryCard } from '../../cards/beneficiary-card';

type IProps = {
  data: IBeneficiary[];
};

export const BeneficiaryCardList = (props: IProps) => {
  console.log('BENEFICIARY CARD LIST', props.data);
  const sortedBeneficiaries = props.data.sort((a, b) => {
    return a.name < b.name ? 1 : 0;
  });

  console.log('BENEFICIARY CARD LIST', props.data, sortedBeneficiaries);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      pinchGestureEnabled
      data={sortedBeneficiaries}
      contentContainerStyle={{ padding: 0 }}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }: { item: IBeneficiary; index: number }) => (
        <BeneficiaryCard data={item} idx={index} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: 'yellow',
  },
  containerNoMargin: {
    marginTop: 0,
  },
});
