import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SearchModal } from '../../src/components/searchboxes/search-modal';
import { FlyFrom } from '../../src/assets';

import { airports, IAirport } from '@clean-rn/footprint/domain';

import { WithCenterView } from '../../wrappers';

const data = airports.map((item: IAirport) => {
  return { key: item.IATA, value: item.name };
});

const meta = {
  title: 'SearchBoxes/SearchModal',
  component: SearchModal,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  args: {
    icon: () => <FlyFrom />,
    data,
  },
  decorators: [WithCenterView],
} as Meta<typeof SearchModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Airports: Story = {
  args: {
    label: 'From',
    placeholder: 'Enter an airport',
    icon: () => <FlyFrom />,
    data,
  },
};
