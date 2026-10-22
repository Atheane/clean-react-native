import { FlatList, View, StyleSheet } from 'react-native';
import { IBeneficiary } from '@clean-rn/beneficiary/domain';

import { BeneficiaryCard } from '../../cards/beneficiary-card';

type IProps = {
  data: IBeneficiary[];
};

export const BeneficiaryCardList = (props: IProps) => {
  const sortedBeneficiaries = props.data.sort((a, b) => {
    return a.name < b.name ? 1 : 0;
  });

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      pinchGestureEnabled
      data={sortedBeneficiaries}
      renderItem={({ item, index }: { item: { date: string; data: IBeneficiary[] }; index: number }) => (
        <View style={index === 0 ? styles.container : styles.containerNoMargin}>
          <BeneficiaryCard {...item} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 140,
  },
  containerNoMargin: {
    marginTop: 0,
  },
});
