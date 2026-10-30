import type { Meta, StoryObj } from '@storybook/react';

import { ITransactionType, Amount, TransactionCategory } from '@clean-rn/transaction/domain';
import { TransactionsCard } from '../../src/components/cards/transactions-card';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TransactionsCard',
  component: TransactionsCard,
  argTypes: {},
  decorators: [WithCenterView],
} satisfies Meta<typeof TransactionsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    data: [
      {
        id: 18709769758746,
        amount: new Amount('131'),
        label: 'Transfer Marie Dupond',
        category: new TransactionCategory(ITransactionType.PAYIN),
        date: new Date('2023-06-14T10:02:24.138Z'),
        type: ITransactionType.PAYIN,
      },
      {
        id: 18709769758747,
        amount: new Amount('-32.45'),
        label: 'Carrefour Saint-Serge',
        category: new TransactionCategory(ITransactionType.CARD_TRANSACTION, 122),
        date: new Date('2023-06-14T10:02:24.139Z'),
        type: ITransactionType.CARD_TRANSACTION,
      },
      {
        id: 18709769758748,
        amount: new Amount('-75.64'),
        label: 'Station Total Brest',
        category: new TransactionCategory(ITransactionType.CARD_TRANSACTION, 122),
        date: new Date('2023-06-14T10:02:24.140Z'),
        type: ITransactionType.CARD_TRANSACTION,
      },
    ],
    date: 'Mardi 22 septembre 2022',
  },
};
