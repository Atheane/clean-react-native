import type { Meta, StoryObj } from '@storybook/react';
import { ContactCard } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';
import { Phone } from '@clean-rn/contact/domain';

const meta = {
  title: 'Cards/ContactCard',
  component: ContactCard,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} satisfies Meta<typeof ContactCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Even: Story = {
  args: {
    data: {
      id: 'unique-id',
      name: 'John Doe',
      phone: new Phone('+33612345678', 'FR'),
    },
    idx: 0,
    onPress: undefined,
  },
};

export const EvenPress: Story = {
  args: {
    data: {
      id: 'unique-id',
      name: 'John Doe',
      phone: new Phone('+33612345678', 'FR'),
    },
    idx: 0,
    onPress: undefined,
  },
};

export const Odd: Story = {
  args: {
    data: {
      id: 'unique-id',
      name: 'John Doe',
      phone: new Phone('+33612345678', 'FR'),
    },
    idx: 1,
    onPress: undefined,
  },
};

export const OddPress: Story = {
  args: {
    data: {
      id: 'unique-id',
      name: 'John Doe',
      phone: new Phone('+33612345678', 'FR'),
    },
    idx: 1,
    onPress: undefined,
  },
};
