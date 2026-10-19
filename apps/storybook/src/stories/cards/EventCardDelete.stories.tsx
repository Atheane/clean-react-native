import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { EventCardDelete, Tree } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const EventCardDeleteMeta: ComponentMeta<typeof EventCardDelete> = {
  title: 'Cards/EventCardDelete',
  component: EventCardDelete,
  argTypes: {
    onDelete: { action: 'onDelete' },
  },
  args: {
    icon: Tree,
    text: 'Lorem ipsum delatus',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default EventCardDeleteMeta;

type EventCardDeleteStory = ComponentStory<typeof EventCardDelete>;

export const Dynamic: EventCardDeleteStory = (args) => <EventCardDelete {...args} />;
