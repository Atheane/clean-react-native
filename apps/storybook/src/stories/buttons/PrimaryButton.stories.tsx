// stories/buttons/PrimaryButton.stories.tsx
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { Love, Validate, PrimaryButton, Colors, CO2 } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Buttons/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} satisfies Meta<typeof PrimaryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoIcon: Story = {
  args: {
    long: false,
    uppercase: true,
    disabled: false,
    title: 'No icon',
  },
};

export const Loading: Story = {
  args: {
    long: true,
    uppercase: true,
    disabled: false,
    loading: true,
    title: 'Loading',
  },
};

export const OneIcon: Story = {
  args: {
    long: true,
    uppercase: true,
    disabled: false,
    title: 'OneIcon',
    iconLeft: () => <Love width={23} height={23} color={Colors.primary.white} />,
  },
};

export const LongText: Story = {
  args: {
    long: true,
    uppercase: false,
    disabled: false,
    title: 'This is a button with long text',
    iconLeft: () => <Love width={23} height={23} color={Colors.primary.white} />,
  },
};

export const TwoIcons: Story = {
  args: {
    long: true,
    uppercase: false,
    disabled: false,
    title: 'Two Icons',
    iconLeft: () => <Love width={23} height={23} color={Colors.primary.white} />,
    iconRight: () => <Validate width={23} height={23} color={Colors.primary.white} />,
  },
};

export const CO2Button: Story = {
  args: {
    long: true,
    uppercase: true,
    disabled: false,
    title: 'CO2 Button',
    iconLeft: () => (
      <View style={{ height: 23, justifyContent: 'center' }}>
        <CO2 color={Colors.primary.white} />
      </View>
    ),
  },
};
