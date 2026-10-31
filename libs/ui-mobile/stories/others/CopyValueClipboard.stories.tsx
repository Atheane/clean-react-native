import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { CopyValueClipboard } from '../../src/components/others/copy-value-clipboard';
import { Iban as IbanIcon, BankBuilding as BicIcon } from '../../src/assets';
import { WithCenterView } from '../../wrappers';
import { Colors } from '../../src/constants';

const meta = {
  title: 'Others/CopyValueClipboard',
  component: CopyValueClipboard,
  argTypes: {},
  decorators: [WithCenterView],
} as Meta<typeof CopyValueClipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Iban: Story = {
  args: {
    value: 'FR7616798000010000215323243',
    icon: () => <IbanIcon />,
    text: 'IBAN',
    textColor: Colors.primary.lightGreen,
    copyText: 'Copy',
  },
};

export const Bic: Story = {
  args: {
    value: 'TRZOFR21XXX',
    icon: () => <BicIcon />,
    text: 'BIC',
    textColor: Colors.primary.lightGreen,
    copyText: 'Copy',
  },
};
