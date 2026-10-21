import { StyleSheet, Text, View } from 'react-native';
import { Card, Divider } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { SvgProps } from 'react-native-svg';

import { IBeneficiary, IBeneficiaryCategory } from '@clean-rn/beneficiary/domain';
import { BeneficiaryItem } from '../../others/transaction-item';

import { BANK } from '../../../assets';

type IProps = {
  date: string;
  data: IBeneficiary[];
};

const BeneficiaryIcons = {
  [IBeneficiaryCategory.BANK]: BANK,
} as { [key: string]: React.FC<SvgProps> };

export const BeneficiaryCard = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <Card containerStyle={[theme.bank.container.card.long, theme.bank.shadow.card]}>
      <View>
        <Text style={theme.bank.text.boldDarkBlue}>{props.date}</Text>
      </View>
      <View style={styles.transactionsContainer}>
        {props.data.map((data: IBeneficiary, index: number) => {
          return (
            <View key={data.beneficiaryId}>
              <BeneficiaryItem icon={BeneficiaryIcons[BANK]} name={data.name} iban={data.iban} />
              {index !== props.data.length - 1 && (
                <View style={styles.divider}>
                  <Divider />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  transactionsContainer: {
    marginTop: 16,
  },
  divider: {
    marginVertical: 10,
  },
});
