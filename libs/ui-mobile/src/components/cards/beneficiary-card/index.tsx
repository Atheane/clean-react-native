import { StyleSheet, Text, View } from 'react-native';
import { Card, Divider } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { SvgProps } from 'react-native-svg';

import { IBeneficiary, IBeneficiaryCategory } from '@clean-rn/beneficiary/domain';
import { BeneficiaryItem } from '../../others/beneficiary-item';

import { BANK } from '../../../assets';

type IProps = {
  data: IBeneficiary;
  idx: number;
};

//const BeneficiaryIcons = {
//  [IBeneficiaryCategory.BANK]: BANK,
//} as { [key: string]: React.FC<SvgProps> };

export const BeneficiaryCard = (props: IProps) => {
  //icon={BeneficiaryIcons['BANK']}
  console.log('BENEFICIARY CARD', props);
  const { theme } = useTheme();
  return (
    <Card containerStyle={styles.beneficiaryContainer}>
      <View key={props.data.beneficiaryId}>
        <BeneficiaryItem name={props.data.name} iban={props.data.iban} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  beneficiaryContainer: {
    marginHorizontal: 0,
    height: 80,
  },
});
