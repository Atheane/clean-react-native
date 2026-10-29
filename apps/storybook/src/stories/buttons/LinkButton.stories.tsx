import type { Meta, StoryObj } from '@storybook/react';
import { StyleProp, ViewStyle } from 'react-native';

import { LinkButton, LinkButtonColors, Love, Colors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const meta = {
  title: 'Buttons/LinkButton',
  component: LinkButton,
  argTypes: {
    onPress: { action: 'onPress' },
    colorOption: {
      options: [LinkButtonColors.GREEN, LinkButtonColors.PINK, LinkButtonColors.BLUE],
      control: { type: 'radio' },
    },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoIcon: Story = {
  args: {
    title: 'My title',
  },
};

export const Arrow: Story = {
  args: {
    title: 'My title',
    arrow: true,
    colorOption: LinkButtonColors.BLUE,
  },
};

export const IconLeft: Story = {
  args: {
    title: 'My title',
    colorOption: LinkButtonColors.GREEN,
    iconLeft: (styleProps: StyleProp<ViewStyle>) => <Love width={20} height={20} style={styleProps} />,
  },
};

export const IconRight: Story = {
  args: {
    title: 'My title',
    iconRight: () => (
      <Love
        width={20}
        height={20}
        style={{ color: Colors.primary.lightGreen, marginLeft: 10 } as StyleProp<ViewStyle>}
      />
    ),
  },
};

export const IconLeftRight: Story = {
  args: {
    title: 'My title',
    iconLeft: () => (
      <Love
        width={20}
        height={20}
        style={{ color: Colors.primary.lightGreen, marginRight: 10 } as StyleProp<ViewStyle>}
      />
    ),
    iconRight: () => (
      <Love
        width={20}
        height={20}
        style={{ color: Colors.primary.lightGreen, marginLeft: 10 } as StyleProp<ViewStyle>}
      />
    ),
  },
};
