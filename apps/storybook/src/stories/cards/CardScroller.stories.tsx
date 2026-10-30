import type { Meta, StoryObj } from '@storybook/react';

import { CardScroller, LoanHeater, CarbonFootprint } from '@clean-rn/ui-mobile';

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
      { image: LoanHeater, title: '', text: 'bla1', uid: 'ajkzhrei1' },
      { image: LoanHeater, title: '', text: 'bla2', uid: 'ajkzhrei2' },
      { image: LoanHeater, title: '', text: 'bla3', uid: 'ajkzhrei3' },
      { image: LoanHeater, title: '', text: 'bla4', uid: 'ajkzhrei4' },
      { image: LoanHeater, title: '', text: 'bla5', uid: 'ajkzhrei5' },
      { image: LoanHeater, title: '', text: 'bla6', uid: 'ajkzhrei6' },
      { image: LoanHeater, title: '', text: 'bla7', uid: 'ajkzhrei7' },
      { image: LoanHeater, title: '', text: 'bla8', uid: 'ajkzhrei8' },
    ],
    height: 300,
  },
};

export const CardScrollerImgNoDelete: Story = {
  args: {
    data: [
      { image: LoanHeater, title: '', text: 'bla1', uid: 'ajkzhrei1' },
      { image: LoanHeater, title: '', text: 'bla2', uid: 'ajkzhrei2' },
      { image: LoanHeater, title: '', text: 'bla3', uid: 'ajkzhrei3' },
      { image: LoanHeater, title: '', text: 'bla4', uid: 'ajkzhrei4' },
      { image: LoanHeater, title: '', text: 'bla5', uid: 'ajkzhrei5' },
      { image: LoanHeater, title: '', text: 'bla6', uid: 'ajkzhrei6' },
      { image: LoanHeater, title: '', text: 'bla7', uid: 'ajkzhrei7' },
      { image: LoanHeater, title: '', text: 'bla8', uid: 'ajkzhrei8' },
    ],
    height: 300,
    onDelete: undefined,
  },
};

export const CardScrollerIconWithDelete: Story = {
  args: {
    data: [
      { icon: () => <CarbonFootprint />, title: '', text: 'bla1', uid: 'ajkzhrei1' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla2', uid: 'ajkzhrei2' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla3', uid: 'ajkzhrei3' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla4', uid: 'ajkzhrei4' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla5', uid: 'ajkzhrei5' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla6', uid: 'ajkzhrei6' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla7', uid: 'ajkzhrei7' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla8', uid: 'ajkzhrei8' },
    ],
    height: 300,
  },
};

export const CardScrollerIconNoDelete: Story = {
  args: {
    data: [
      { icon: () => <CarbonFootprint />, title: '', text: 'bla1', uid: 'ajkzhrei1' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla2', uid: 'ajkzhrei2' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla3', uid: 'ajkzhrei3' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla4', uid: 'ajkzhrei4' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla5', uid: 'ajkzhrei5' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla6', uid: 'ajkzhrei6' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla7', uid: 'ajkzhrei7' },
      { icon: () => <CarbonFootprint />, title: '', text: 'bla8', uid: 'ajkzhrei8' },
    ],
    height: 300,
    onDelete: undefined,
  },
};
