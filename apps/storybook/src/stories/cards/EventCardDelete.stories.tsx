import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { EventCardDelete, CarbonFootPrint } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const EventCardDeleteMeta: ComponentMeta<typeof EventCardDelete> = {
  title: 'Cards/EventCardDelete',
  component: EventCardDelete,
  argTypes: {
    onDelete: { action: 'onDelete' },
    onPress: { action: 'onPress' },
  },
  args: {
    icon: CarbonFootPrint,
    text: 'Lorem ipsum delatus',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default EventCardDeleteMeta;

type EventCardDeleteStory = ComponentStory<typeof EventCardDelete>;

export const Dynamic: EventCardDeleteStory = (args) => <EventCardDelete {...args} />;
