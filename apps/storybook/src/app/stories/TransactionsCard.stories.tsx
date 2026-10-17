import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { ITransactionType, Amount, TransactionCategory } from '@clean-rn/account/domain';
import { TransactionsCard } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const TransactionsCardMeta: ComponentMeta<typeof TransactionsCard> = {
  title: 'Cards/TransactionsCard',
  component: TransactionsCard,
  argTypes: {},
  args: {
    data: [
      {
        id: 18709769758746,
        amount: new Amount(131),
        label: 'Virement Marie Dupond',
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
        id: 18709769758748,
        amount: new Amount(-75.64),
        label: 'Station Total Brest',
        category: new TransactionCategory(ITransactionType.CARD_TRANSACTION, 122),
        date: new Date('2023-06-14T10:02:24.140Z'),
        type: ITransactionType.CARD_TRANSACTION,
      },
    ],
    date: 'Mardi 22 septembre 2022',
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.PENDING)],
};

export default TransactionsCardMeta;

type TransactionsCardStory = ComponentStory<typeof TransactionsCard>;

export const Static: TransactionsCardStory = (args) => <TransactionsCard {...args} />;
