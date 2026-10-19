import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { CardScroller, ICardType, Meeting, Tree } from '@clean-rn/ui-mobile';
import { LoanHeater } from '../../../assets/images';

import { WithStatus, ValidationStatus } from '../../wrappers';

const CardScrollerMeta: ComponentMeta<typeof CardScroller> = {
  title: 'Cards/CardScroller',
  component: CardScroller,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    data: [
      { icon: Tree, text: 'bla1', uid: 'ajkzhrei1' },
      { icon: Meeting, text: 'bla2', uid: 'ajkzhrei2' },
      { icon: Tree, text: 'bla3', uid: 'ajkzhrei3' },
      { icon: Meeting, text: 'bla4', uid: 'ajkzhrei4' },
      { icon: Tree, text: 'bla5', uid: 'ajkzhrei5' },
      { icon: Meeting, text: 'bla6', uid: 'ajkzhrei6' },
      { icon: Tree, text: 'bla7', uid: 'ajkzhrei7' },
      { icon: Meeting, text: 'bla8', uid: 'ajkzhrei8' },
    ],
    cardType: ICardType.EVENT_CARD_DELETE,
    height: 200,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default CardScrollerMeta;

type CardScrollerStory = ComponentStory<typeof CardScroller>;

export const EventCardDeleteScroller: CardScrollerStory = (args) => <CardScroller {...args} />;
export const TouchEventCardScroller: CardScrollerStory = (args) => {
  const data = [
    { image: LoanHeater, text: 'bla1', uid: 'ajkzhrei1' },
    { image: LoanHeater, text: 'bla2', uid: 'ajkzhrei2' },
    { image: LoanHeater, text: 'bla3', uid: 'ajkzhrei3' },
    { image: LoanHeater, text: 'bla4', uid: 'ajkzhrei4' },
    { image: LoanHeater, text: 'bla5', uid: 'ajkzhrei5' },
    { image: LoanHeater, text: 'bla6', uid: 'ajkzhrei6' },
    { image: LoanHeater, text: 'bla7', uid: 'ajkzhrei7' },
    { image: LoanHeater, text: 'bla8', uid: 'ajkzhrei8' },
  ];
  return <CardScroller {...args} data={data} cardType={ICardType.TOUCH_EVENT_CARD} />;
};
