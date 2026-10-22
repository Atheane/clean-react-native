import { Dimensions, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
//
import { IBeneficiary } from '@clean-rn/beneficiary/domain';
//
import { Colors } from '../../../constants';
import { BeneficiaryItem } from '../../items/beneficiary-item';
import { BankBgGradient } from '../../../assets';

type IProps = {
  data: IBeneficiary & { icon?: React.FC<SvgProps> };
  idx: number;
  onDelete?: (beneficiary: number) => void;
  onPress?: (beneficiary: number) => void;
};

export const BeneficiaryCard = (props: IProps) => {
  return (
    <View
      style={props.idx % 2 ? styles.beneficiaryContainer : [styles.beneficiaryContainer, styles.oddContainer]}
    >
      <View>
        <BeneficiaryItem
          icon={props.data.icon ? props.data.icon : BankBgGradient}
          beneficiaryId={props.data.beneficiaryId}
          name={props.data.name}
          iban={props.data.iban}
          onDelete={props.onDelete}
          onPress={props.onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  beneficiaryContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 72,
    width: Dimensions.get('window').width,
  },
  oddContainer: {
    backgroundColor: Colors.bank.primary.lightGrey,
  },
});
