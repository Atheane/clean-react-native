import type { Meta, StoryObj } from '@storybook/react';

import { CardScroller } from '@clean-rn/ui-mobile';
import { LoanHeater } from '../../../assets/images';
import { CardCarbonFootPrint } from '../../../assets/svg';

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

export const CardScrollerImgWithDelete: Story = {
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
    height: 300,
  },
};

export const CardScrollerImgNoDelete: Story = {
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
    height: 300,
    onDelete: undefined,
  },
};

export const CardScrollerIconWithDelete: Story = {
  args: {
    data: [
      { icon: CardCarbonFootPrint, text: 'bla1', uid: 'ajkzhrei1' },
      { icon: CardCarbonFootPrint, text: 'bla2', uid: 'ajkzhrei2' },
      { icon: CardCarbonFootPrint, text: 'bla3', uid: 'ajkzhrei3' },
      { icon: CardCarbonFootPrint, text: 'bla4', uid: 'ajkzhrei4' },
      { icon: CardCarbonFootPrint, text: 'bla5', uid: 'ajkzhrei5' },
      { icon: CardCarbonFootPrint, text: 'bla6', uid: 'ajkzhrei6' },
      { icon: CardCarbonFootPrint, text: 'bla7', uid: 'ajkzhrei7' },
      { icon: CardCarbonFootPrint, text: 'bla8', uid: 'ajkzhrei8' },
    ],
    height: 300,
  },
};

export const CardScrollerIconNoDelete: Story = {
  args: {
    data: [
      { icon: CardCarbonFootPrint, text: 'bla1', uid: 'ajkzhrei1' },
      { icon: CardCarbonFootPrint, text: 'bla2', uid: 'ajkzhrei2' },
      { icon: CardCarbonFootPrint, text: 'bla3', uid: 'ajkzhrei3' },
      { icon: CardCarbonFootPrint, text: 'bla4', uid: 'ajkzhrei4' },
      { icon: CardCarbonFootPrint, text: 'bla5', uid: 'ajkzhrei5' },
      { icon: CardCarbonFootPrint, text: 'bla6', uid: 'ajkzhrei6' },
      { icon: CardCarbonFootPrint, text: 'bla7', uid: 'ajkzhrei7' },
      { icon: CardCarbonFootPrint, text: 'bla8', uid: 'ajkzhrei8' },
    ],
    height: 300,
    onDelete: undefined,
  },
};
