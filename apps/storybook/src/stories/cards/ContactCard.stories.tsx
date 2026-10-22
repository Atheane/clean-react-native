import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { ContactCard } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const ContactCardMeta: ComponentMeta<typeof ContactCard> = {
  title: 'Cards/ContactCard',
  component: ContactCard,
  args: {
    data: {
      name: 'John Doe',
      phone: '0612345678',
    },
    idx: 0,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default ContactCardMeta;

type ContactCardStory = ComponentStory<typeof ContactCard>;

export const Even: ContactCardStory = (args) => {
  return <ContactCard {...args} />;
};
export const Odd: ContactCardStory = (args) => {
  return <ContactCard {...args} idx={1} />;
};
