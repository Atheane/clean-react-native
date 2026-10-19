import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { TouchEventCard } from '@clean-rn/ui-mobile';

import { LoanHeater } from '../../../assets/images';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const TouchEventCardMeta: ComponentMeta<typeof TouchEventCard> = {
  title: 'Cards/TouchEventCard',
  component: TouchEventCard,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    image: LoanHeater,
    text: 'Lorem ipsum delatus',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default TouchEventCardMeta;

type TouchEventCardStory = ComponentStory<typeof TouchEventCard>;

export const Dynamic: TouchEventCardStory = (args) => <TouchEventCard {...args} />;
