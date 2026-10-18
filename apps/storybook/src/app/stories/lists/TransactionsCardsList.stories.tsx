import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { useTranslation } from 'react-i18next';

import { ITransactionType, Amount, TransactionCategory } from '@clean-rn/account/domain';
import { TransactionsCardsList } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const TransactionsCardsListMeta: ComponentMeta<typeof TransactionsCardsList> = {
  title: 'Lists/TransactionsCardsList',
  component: TransactionsCardsList,
  argTypes: {},
  args: {
    data: [],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default TransactionsCardsListMeta;

type TransactionsCardsListStory = ComponentStory<typeof TransactionsCardsList>;

export const Static: TransactionsCardsListStory = (args) => {
  const { t } = useTranslation();
  const data = [
    {
      id: 18709769758746,
      amount: new Amount(131),
      label: t('screens.account.transfer') + ' Marie Dupond',
      category: new TransactionCategory(ITransactionType.PAYIN),
      date: new Date('2023-06-14T10:02:24.138Z'),
      type: ITransactionType.PAYIN,
    },
    {
      id: 18709769758747,
      amount: new Amount(-32.45),
      label: 'Carrefour Saint-Serge',
      category: new TransactionCategory(ITransactionType.CARD_TRANSACTION, 122),
      date: new Date('2023-06-14T10:02:24.139Z'),
      type: ITransactionType.CARD_TRANSACTION,
    },
    {
      id: 187097658748,
      amount: new Amount(-75.64),
      label: 'Station Total Brest',
      category: new TransactionCategory(ITransactionType.CARD_TRANSACTION, 122),
      date: new Date('2023-06-13T10:02:24.140Z'),
      type: ITransactionType.CARD_TRANSACTION,
    },
    {
      id: 187069758746,
      amount: new Amount(131),
      label: t('screens.account.transfer') + ' Marie Dupond',
      category: new TransactionCategory(ITransactionType.PAYIN),
      date: new Date('2023-06-13T10:02:24.138Z'),
      type: ITransactionType.PAYIN,
    },
    {
      id: 187097697587,
      amount: new Amount(-32.45),
      label: 'Carrefour Saint-Serge',
      category: new TransactionCategory(ITransactionType.CARD_TRANSACTION, 122),
      date: new Date('2023-06-13T10:02:24.139Z'),
      type: ITransactionType.CARD_TRANSACTION,
    },
    {
      id: 1879869758748,
      amount: new Amount(-75.64),
      label: 'Station Total Brest',
      category: new TransactionCategory(ITransactionType.CARD_TRANSACTION, 122),
      date: new Date('2023-06-11T10:02:24.140Z'),
      type: ITransactionType.CARD_TRANSACTION,
    },
  ];
  return <TransactionsCardsList {...args} data={data} />;
};
