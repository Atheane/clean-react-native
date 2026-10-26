import type { Meta, StoryObj } from '@storybook/react';
import { LongCard, ExportPdfGradient } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/LongCard',
  component: LongCard,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} satisfies Meta<typeof LongCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: 'Current month',
    icon: ExportPdfGradient,
    pressable: true,
  },
};
