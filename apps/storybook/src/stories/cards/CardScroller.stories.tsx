import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { CardScroller } from '@clean-rn/ui-mobile';
import { LoanHeater } from '../../../assets/images';

import { WithStatus, ValidationStatus } from '../../wrappers';

const CardScrollerMeta: ComponentMeta<typeof CardScroller> = {
  title: 'Cards/CardScroller',
  component: CardScroller,
  argTypes: {
    onPress: { action: 'onPress' },
    onDelete: { action: 'onDelete' },
  },
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
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default CardScrollerMeta;

type CardScrollerStory = ComponentStory<typeof CardScroller>;

export const CardScrollerWithDelete: CardScrollerStory = (args) => {
  return <CardScroller {...args} />;
};

export const CardScrollerNoDelete: CardScrollerStory = (args) => {
  return <CardScroller {...args} onDelete={undefined} />;
};
