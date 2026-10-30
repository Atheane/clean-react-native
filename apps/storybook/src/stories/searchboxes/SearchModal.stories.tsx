import { StyleProp, ViewStyle } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';

import { SearchModal, FlyFrom, Colors } from '@clean-rn/ui-mobile';
import { airports, IAirport } from '@clean-rn/footprint/domain';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

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
    icon: () => <FlyFrom style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />,
    data,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof SearchModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Airports: Story = {
  args: {
    label: 'From',
    placeholder: 'Enter an airport',
    icon: () => <FlyFrom style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />,
    data,
  },
};
