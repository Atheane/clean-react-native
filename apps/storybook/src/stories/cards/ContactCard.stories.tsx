import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { ContactCard } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';
import { Phone } from '@clean-rn/contact/domain';

const ContactCardMeta: ComponentMeta<typeof ContactCard> = {
  title: 'Cards/ContactCard',
  component: ContactCard,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    data: {
      id: 'unique-id',
      name: 'John Doe',
      phone: new Phone('+33612345678', 'FR'),
    },
    idx: 0,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default ContactCardMeta;

type ContactCardStory = ComponentStory<typeof ContactCard>;

export const Even: ContactCardStory = (args) => {
  return <ContactCard {...args} onPress={undefined} />;
};

export const EvenPress: ContactCardStory = (args) => {
  return <ContactCard {...args} />;
};
export const Odd: ContactCardStory = (args) => {
  return <ContactCard {...args} idx={1} onPress={undefined} />;
};

export const OddPress: ContactCardStory = (args) => {
  return <ContactCard {...args} idx={1} />;
};
