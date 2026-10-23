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
        name: 'John Doe',
        phone: new Phone('+33612345678'),
      },
      {
        name: 'Marie Jeanne',
        phone: new Phone('+4593705821'),
      },
      {
        name: 'Jeanne Durut',
        phone: new Phone('+3584573988222'),
      },
      {
        name: 'John Doe2',
        phone: new Phone('+12013514000'), // US phone number, should not be shown in list
      },
    ],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default ContactCardListMeta;

type ContactCardListStory = ComponentStory<typeof ContactCardList>;

export const OnPress: ContactCardListStory = (args) => <ContactCardList {...args} />;
