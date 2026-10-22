import { StyleSheet, View } from 'react-native';
import { Card } from '@rneui/base';
//
import { IBeneficiary } from '@clean-rn/beneficiary/domain';
//
import { Colors } from '../../../constants';
import { BeneficiaryItem } from '../../others/beneficiary-item';
import { BANK } from '../../../assets';

type IProps = {
  data: IBeneficiary;
  idx: number;
};

export const BeneficiaryCard = (props: IProps) => {
  return (
    <Card
      containerStyle={
        props.idx % 2 ? styles.beneficiaryContainer : [styles.beneficiaryContainer, styles.oddContainer]
      }
    >
      <View key={props.data.beneficiaryId}>
        <BeneficiaryItem icon={BANK} name={props.data.name} iban={props.data.iban} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  beneficiaryContainer: {
    marginHorizontal: 0,
    marginVertical: 0,
    height: 70,
  },
  oddContainer: {
    backgroundColor: Colors.bank.primary.lightGrey,
  },
});
