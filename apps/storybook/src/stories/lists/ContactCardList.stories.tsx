import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Phone } from '@clean-rn/contact/domain';
import { ContactCardList } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithCenterView, WithStatus } from '../../wrappers';

const ContactCardListMeta: ComponentMeta<typeof ContactCardList> = {
  title: 'Lists/ContactCardList',
  component: ContactCardList,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    data: [
      {
        id: 'uuid1',
        name: 'John Doe1',
        phone: new Phone('+33612345677', 'FR'),
      },
      {
        id: 'uuid2',
        name: 'John Doe2',
        phone: new Phone('+33612345678', 'FR'),
      },
      {
        id: 'uuid3',
        name: 'John Doe3',
        phone: new Phone('+33612345679', 'FR'),
      },
    ],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default ContactCardListMeta;

type ContactCardListStory = ComponentStory<typeof ContactCardList>;

export const OnPress: ContactCardListStory = (args) => <ContactCardList {...args} />;
