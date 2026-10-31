import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { Card, Divider } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { SvgProps } from 'react-native-svg';

import { ITransaction, ITransactionCategory } from '@clean-rn/transaction/domain';

import {
  TransactionAlcohol as ALCOHOL,
  TransactionArt as ART,
  TransactionAssurance as ASSURANCES,
  TransactionBank as BANK,
  TransactionBar as BAR,
  TransactionClothing as CLOTHING,
  TransactionCulture as CULTURE,
  TransactionDiverse as DIVERSE,
  TransactionEndowment as ENDOWMENT,
  TransactionFuel as FUEL,
  TransactionHealth as HEALTH,
  TransactionHighTech as HIGHT_TECH,
  TransactionHousing as HOUSING,
  TransactionLegal as LEGAL,
  TransactionLeisure as LEISURE,
  TransactionNumeric as NUMERIC,
  TransactionNursing as NURSING,
  TransactionNutrition as NUTRITION,
  TransactionPro as PRO,
  TransactionProcurement as PROCUREMENT,
  TransactionRestaurant as RESTAURANT,
  TransactionSchooling as SCHOOLING,
  TransactionSubscription as SUBSCRIPTIONS,
  TransactionTransport as TRANSPORT,
  TransactionTravel as TRAVEL,
  TransactionVehicle as VEHICLE,
} from '../../../assets';

import { TransactionItem } from '../../items/transaction-item';

type IProps = {
  date: string;
  data: ITransaction[];
};

const TransactionIcons = {
  [ITransactionCategory.ALCOHOL]: () => <ALCOHOL />,
  [ITransactionCategory.ART]: () => <ART />,
  [ITransactionCategory.ASSURANCES]: () => <ASSURANCES />,
  [ITransactionCategory.BANK]: () => <BANK />,
  [ITransactionCategory.BAR]: () => <BAR />,
  [ITransactionCategory.CLOTHING]: () => <CLOTHING />,
  [ITransactionCategory.CULTURE]: () => <CULTURE />,
  [ITransactionCategory.DIVERSE]: () => <DIVERSE />,
  [ITransactionCategory.ENDOWMENT]: () => <ENDOWMENT />,
  [ITransactionCategory.FUEL]: () => <FUEL />,
  [ITransactionCategory.HEALTH]: () => <HEALTH />,
  [ITransactionCategory.HIGHT_TECH]: () => <HIGHT_TECH />,
  [ITransactionCategory.HOUSING]: () => <HOUSING />,
  [ITransactionCategory.LEGAL]: () => <LEGAL />,
  [ITransactionCategory.LEISURE]: () => <LEISURE />,
  [ITransactionCategory.NUMERIC]: () => <NUMERIC />,
  [ITransactionCategory.NURSING]: () => <NURSING />,
  [ITransactionCategory.NUTRITION]: () => <NUTRITION />,
  [ITransactionCategory.PRO]: () => <PRO />,
  [ITransactionCategory.PROCUREMENT]: () => <PROCUREMENT />,
  [ITransactionCategory.RESTAURANTS]: () => <RESTAURANT />,
  [ITransactionCategory.SCHOOLING]: () => <SCHOOLING />,
  [ITransactionCategory.SUBSCRIPTIONS]: () => <SUBSCRIPTIONS />,
  [ITransactionCategory.TRANSPORT]: () => <TRANSPORT />,
  [ITransactionCategory.TRAVEL]: () => <TRAVEL />,
  [ITransactionCategory.VEHICLES]: () => <VEHICLE />,
} as { [key: string]: React.FC<SvgProps> };

export const TransactionsCard = (props: IProps) => {
  const { theme } = useTheme();
  return (
    <Card
      containerStyle={
        Platform.OS === 'web' ? styles.webShadow : [theme.container.card.long, theme.shadow.card]
      }
    >
      <View>
        <Text style={theme.text.boldDarkBlue}>{props.date}</Text>
      </View>
      <View style={styles.transactionsContainer}>
        {props.data.map((data: ITransaction, index: number) => {
          return (
            <View key={data.id}>
              <TransactionItem
                icon={data.category ? TransactionIcons[data.category.value] : () => <DIVERSE />}
                label={data.label}
                amount={data.amount.value}
              />
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
  webShadow: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    borderRadius: 28,
  },
});
