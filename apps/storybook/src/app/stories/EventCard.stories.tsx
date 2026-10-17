import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { EventCard, Tree } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const EventCardMeta: ComponentMeta<typeof EventCard> = {
  title: 'Pending/Account/EventCard',
  component: EventCard,
  argTypes: {
    onDelete: { action: 'onDelete' },
  },
  args: {
    icon: Tree,
    text: 'Concours Weflo RSE lorem ipsum delatus',
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.PENDING)],
};

export default EventCardMeta;

type EventCardStory = ComponentStory<typeof EventCard>;

export const Dynamic: EventCardStory = (args) => <EventCard {...args} />;
