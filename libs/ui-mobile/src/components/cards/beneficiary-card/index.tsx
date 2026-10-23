import { Dimensions, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
//
import { IBeneficiary } from '@clean-rn/beneficiary/domain';
//
import { Colors } from '../../../constants';
import { BeneficiaryItem } from '../../items/beneficiary-item';
import { BankBgGradient, BankAltLogo } from '../../../assets';

type IProps = {
  data: IBeneficiary & { icon?: React.FC<SvgProps> };
  idx: number;
  onDelete?: (beneficiaryId: number) => void;
  onPress?: (beneficiaryId: number) => void;
};

export const BeneficiaryCard = (props: IProps) => {
  return (
    <View
      style={
        props.idx % 2 === 0
          ? [styles.beneficiaryContainer, styles.evenContainer]
          : [styles.beneficiaryContainer, styles.oddContainer]
      }
    >
      <View>
        <BeneficiaryItem
          icon={props.data.icon ? props.data.icon : props.data.accountId ? BankAltLogo : BankBgGradient}
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
  evenContainer: {
    backgroundColor: Colors.bank.primary.lightGrey,
  },
  oddContainer: {
    backgroundColor: Colors.bank.primary.white,
  },
});
