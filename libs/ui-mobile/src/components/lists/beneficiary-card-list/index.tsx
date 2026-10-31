import { FlatList } from 'react-native';
//
import { BeneficiaryCard } from '../../cards/beneficiary-card';

interface IBeneficiary {
  accountId?: number; //if its os a CO2 account
  isActive: boolean;
  beneficiaryId: number;
  name: string;
  iban: string;
  bic: string;
}

type IProps = {
  data: IBeneficiary[];
  onDelete?: (beneficiaryId: number) => void | undefined;
  onPress?: (beneficiaryId: number) => void | undefined;
};

export const BeneficiaryCardList = (props: IProps) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      pinchGestureEnabled
      data={props.data}
      contentContainerStyle={{ padding: 0 }}
      keyExtractor={(item) => item.iban}
      renderItem={({ item, index }: { item: IBeneficiary; index: number }) => (
        <BeneficiaryCard data={item} idx={index} onDelete={props.onDelete} onPress={props.onPress} />
      )}
    />
  );
};
