import { StyleProp, ViewStyle } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import { ContactItem, Love, Colors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Items/ContactItem',
  component: ContactItem,
  args: {
    icon: () => (
      <Love
        width={23}
        height={23}
        style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    ),
    name: 'Marie Dupond',
    phone: '0612345678',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof ContactItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    icon: () => (
      <Love
        width={23}
        height={23}
        style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    ),
    name: 'Marie Dupond',
    phone: '0612345678',
  },
};
