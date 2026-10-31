import type { Meta, StoryObj } from '@storybook/react';

import { Phone } from '@clean-rn/contact/domain';
import { ContactCardList } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithCenterView, WithStatus } from '../../wrappers';

const meta = {
  title: 'Lists/ContactCardList',
  component: ContactCardList,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    data: [
      {
        id: 'uuid1',
        name: 'John Doe1',
        phone: new Phone('+33612345677', 'FR'),
      },
      {
        id: 'uuid2',
        name: 'John Doe2',
        phone: new Phone('+33612345678', 'FR'),
      },
      {
        id: 'uuid3',
        name: 'John Doe3',
        phone: new Phone('+33612345679', 'FR'),
      },
    ],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof ContactCardList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnPress: Story = {
  args: {
    onPress: undefined,
  },
};
