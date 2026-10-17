import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { CardScroller, Meeting, Tree } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const CardScrollerMeta: ComponentMeta<typeof CardScroller> = {
  title: 'Cards/CardScroller',
  component: CardScroller,
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
    height: 200,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default CardScrollerMeta;

type CardScrollerStory = ComponentStory<typeof CardScroller>;

export const Dynamic: CardScrollerStory = (args) => <CardScroller {...args} />;
