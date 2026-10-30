import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FunctionComponent } from 'react';
import { SvgProps } from 'react-native-svg';
import { LinkButton } from '../../src/components/buttons/link-button';
import { LinkButtonColors } from '../../src/types';
import { Love } from '../../src/assets';

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
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoIcon: Story = {
  args: {
    title: 'My title',
    colorOption: LinkButtonColors.GREEN,
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
    iconLeft: ((props: { color: string }) => {
      return <Love width={20} height={20} color={props.color} />;
    }) as FunctionComponent<SvgProps>,
  },
};

export const IconRight: Story = {
  args: {
    title: 'My title',
    colorOption: LinkButtonColors.BLUE,
    iconRight: ((props: { color: string }) => {
      return <Love width={20} height={20} color={props.color} />;
    }) as FunctionComponent<SvgProps>,
  },
};

export const IconLeftRight: Story = {
  args: {
    title: 'My title',
    colorOption: LinkButtonColors.PINK,
    iconLeft: ((props: { color: string }) => {
      return <Love width={20} height={20} color={props.color} />;
    }) as FunctionComponent<SvgProps>,
    iconRight: ((props: { color: string }) => {
      return <Love width={20} height={20} color={props.color} />;
    }) as FunctionComponent<SvgProps>,
  },
};
