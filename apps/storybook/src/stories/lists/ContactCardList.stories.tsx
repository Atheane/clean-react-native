import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { ContactCardList } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithCenterView, WithStatus } from '../../wrappers';

const ContactCardListMeta: ComponentMeta<typeof ContactCardList> = {
  title: 'Lists/ContactCardList',
  component: ContactCardList,
  args: {
    data: [
      {
        name: 'John Doe',
        phone: '0612345678',
      },
      {
        name: 'Marie Jeanne',
        phone: '0708091011',
      },
      {
        name: 'Jeanne Durut',
        phone: '0708070807',
      },
    ],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default ContactCardListMeta;

type ContactCardListStory = ComponentStory<typeof ContactCardList>;

export const Static: ContactCardListStory = (args) => <ContactCardList {...args} />;
