import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const Button = ({ label }: { label: string }) => <button>{label}</button>;

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Example/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Button',
  },
};
