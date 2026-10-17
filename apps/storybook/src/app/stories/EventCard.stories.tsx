import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { EventCard, Tree } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../wrappers';

const EventCardMeta: ComponentMeta<typeof EventCard> = {
  title: 'Cards/EventCard',
  component: EventCard,
  argTypes: {
    onDelete: { action: 'onDelete' },
  },
  args: {
    icon: Tree,
    text: 'Concours Weflo RSE lorem ipsum delatus',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default EventCardMeta;

type EventCardStory = ComponentStory<typeof EventCard>;

export const Dynamic: EventCardStory = (args) => <EventCard {...args} />;
