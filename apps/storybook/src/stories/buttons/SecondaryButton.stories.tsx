// stories/buttons/SecondaryButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { SecondaryButton, Logout, Colors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Buttons/SecondaryButton',
  component: SecondaryButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
    iconLeft: { table: { disable: true } },
  },
  decorators: [(Story: any) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} satisfies Meta<typeof SecondaryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Short: Story = {
  args: {
    long: false,
    uppercase: true,
    title: 'Short',
  },
};

export const Long: Story = {
  args: {
    long: true,
    uppercase: true,
    title: 'Long',
  },
};

export const Icon: Story = {
  args: {
    long: true,
    uppercase: true,
    title: 'Icon',
    iconLeft: (props) => <Logout width={27} height={27} color={Colors.primary.lightGreen as string} />,
  },
};

export const LongText: Story = {
  args: {
    long: true,
    uppercase: false,
    title: 'This is a Button with long text',
    iconLeft: (props) => <Logout width={27} height={27} color={Colors.primary.lightGreen as string} />,
  },
};
