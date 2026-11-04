import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TouchCardStatus } from '../../src/components/cards/touch-card-status';
import { House as HouseGradient } from '../../src/assets';
import { Colors } from '../../src/constants';
import { WithCenterView } from '../../wrappers';

enum ISituationStatus {
  INIT = 'INIT', // form request template is created, but is not sent for review
  CANCELED = 'CANCELED', // form request is canceled before analysis
  PENDING = 'PENDING', // form request has pending status
  VALIDATED = 'VALIDATED', // form request is validated
  REFUSED = 'REFUSED', // form request is refused
}

const meta = {
  title: 'Cards/TouchCardStatus',
  component: TouchCardStatus,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [WithCenterView],
} satisfies Meta<typeof TouchCardStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const House: Story = {
  args: {
    icon: () => <HouseGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
  },
};

export const HouseChecked: Story = {
  args: {
    icon: () => <HouseGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
    status: ISituationStatus.VALIDATED,
  },
};

export const HouseRefused: Story = {
  args: {
    icon: () => <HouseGradient startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    text: 'Lorem ipsum',
    status: ISituationStatus.REFUSED,
  },
};
