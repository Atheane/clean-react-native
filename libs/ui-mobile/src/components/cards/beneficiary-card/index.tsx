import { Dimensions, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Card } from '@rneui/base';
//
import { IBeneficiary } from '@clean-rn/beneficiary/domain';
//
import { Colors } from '../../../constants';
import { BeneficiaryItem } from '../../items/beneficiary-item';
import { BANK } from '../../../assets';

type IProps = {
  data: IBeneficiary & { icon?: React.FC<SvgProps> };
  idx: number;
  onDelete?: (beneficiary: number) => void;
};

export const BeneficiaryCard = (props: IProps) => {
  return (
    <Card
      containerStyle={
        props.idx % 2 ? styles.beneficiaryContainer : [styles.beneficiaryContainer, styles.oddContainer]
      }
    >
      <View key={props.data.beneficiaryId}>
        <BeneficiaryItem
          icon={props.data.icon ? props.data.icon : BANK}
          beneficiaryId={props.data.beneficiaryId}
          name={props.data.name}
          iban={props.data.iban}
          onDelete={props.onDelete}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  beneficiaryContainer: {
    width: Dimensions.get('window').width * 0.9,
    marginHorizontal: 0,
    marginVertical: 0,
    height: 70,
  },
  oddContainer: {
    backgroundColor: Colors.bank.primary.lightGrey,
  },
});
