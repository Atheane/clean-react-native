import type { Meta, StoryObj } from '@storybook/react';

import { CardScroller } from '@clean-rn/ui-mobile';
import { LoanHeater } from '../../../assets/images';

import { WithStatus, ValidationStatus } from '../../wrappers';

const meta = {
  title: 'Cards/CardScroller',
  component: CardScroller,
  argTypes: {
    onPress: { action: 'onPress' },
    onDelete: { action: 'onDelete' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
} satisfies Meta<typeof CardScroller>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CardScrollerWithDelete: Story = {
  args: {
    data: [
      { image: LoanHeater, text: 'bla1', uid: 'ajkzhrei1' },
      { image: LoanHeater, text: 'bla2', uid: 'ajkzhrei2' },
      { image: LoanHeater, text: 'bla3', uid: 'ajkzhrei3' },
      { image: LoanHeater, text: 'bla4', uid: 'ajkzhrei4' },
      { image: LoanHeater, text: 'bla5', uid: 'ajkzhrei5' },
      { image: LoanHeater, text: 'bla6', uid: 'ajkzhrei6' },
      { image: LoanHeater, text: 'bla7', uid: 'ajkzhrei7' },
      { image: LoanHeater, text: 'bla8', uid: 'ajkzhrei8' },
    ],
    height: 200,
  },
};

export const CardScrollerNoDelete: Story = {
  args: {
    data: [
      { image: LoanHeater, text: 'bla1', uid: 'ajkzhrei1' },
      { image: LoanHeater, text: 'bla2', uid: 'ajkzhrei2' },
      { image: LoanHeater, text: 'bla3', uid: 'ajkzhrei3' },
      { image: LoanHeater, text: 'bla4', uid: 'ajkzhrei4' },
      { image: LoanHeater, text: 'bla5', uid: 'ajkzhrei5' },
      { image: LoanHeater, text: 'bla6', uid: 'ajkzhrei6' },
      { image: LoanHeater, text: 'bla7', uid: 'ajkzhrei7' },
      { image: LoanHeater, text: 'bla8', uid: 'ajkzhrei8' },
    ],
    height: 200,
    onDelete: undefined,
  },
};
