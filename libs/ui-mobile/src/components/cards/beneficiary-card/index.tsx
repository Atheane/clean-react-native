import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { BeneficiaryItem } from '../../items/beneficiary-item';
import { BankBgGradient, BankAltLogo } from '../../../assets';
import { Colors } from '../../../constants';

type IBeneficiary = {
  accountId?: number; //if its os a CO2 account
  isActive: boolean;
  beneficiaryId: number;
  name: string;
  iban: string;
  bic: string;
};

type IProps = {
  data: IBeneficiary & { icon?: React.FC<SvgProps> };
  idx: number;
  disabled?: boolean;
  onDelete?: (beneficiaryId: number) => void;
  onPress?: (beneficiaryId: number) => void;
};

export const BeneficiaryCard = (props: IProps) => {
  return (
    <TouchableOpacity
      style={
        props.idx % 2 === 0
          ? [styles.beneficiaryContainer, styles.evenContainer, props.disabled && { opacity: 0.5 }]
          : [styles.beneficiaryContainer, styles.oddContainer, props.disabled && { opacity: 0.5 }]
      }
      onPress={() =>
        (props.onPress && props.onPress(props.data.beneficiaryId)) ||
        (props.onDelete && props.onDelete(props.data.beneficiaryId))
      }
      disabled={props.disabled}
    >
      <BeneficiaryItem
        icon={
          props.data.icon
            ? props.data.icon
            : props.data.accountId
              ? () => <BankAltLogo />
              : () => <BankBgGradient />
        }
        beneficiaryId={props.data.beneficiaryId}
        name={props.data.name}
        iban={props.data.iban}
        onPress={props.onPress}
        onDelete={props.onDelete}
        disabled={props.disabled}
      />
    </TouchableOpacity>
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
    backgroundColor: Colors.primary.lightGrey,
  },
  oddContainer: {
    backgroundColor: Colors.primary.white,
  },
});
