import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { TouchEventCard } from '@clean-rn/ui-mobile';

import { LoanHeater } from '../../../assets/images';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const TouchEventCardMeta: ComponentMeta<typeof TouchEventCard> = {
  title: 'Cards/TouchEventCard',
  component: TouchEventCard,
  argTypes: {
    onPress: { action: 'onPress' },
    onDelete: { action: 'onDelete' },
  },
  args: {
    image: LoanHeater,
    text: 'Lorem ipsum delatus',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default TouchEventCardMeta;

type TouchEventCardStory = ComponentStory<typeof TouchEventCard>;

export const WithDelete: TouchEventCardStory = (args) => <TouchEventCard {...args} />;
export const NoDelete: TouchEventCardStory = (args) => <TouchEventCard {...args} onDelete={undefined} />;
