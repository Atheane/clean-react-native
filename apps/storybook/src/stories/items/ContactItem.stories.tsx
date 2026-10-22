import { StyleProp, ViewStyle } from 'react-native';

import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { ContactItem, Love, Colors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const ContactItemMeta: ComponentMeta<typeof ContactItem> = {
  title: 'Items/ContactItem',
  component: ContactItem,
  args: {
    icon: () => (
      <Love
        width={23}
        height={23}
        style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    ),
    name: 'Marie Dupond',
    phone: '0612345678',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default ContactItemMeta;

type ContactItemStory = ComponentStory<typeof ContactItem>;

export const Static: ContactItemStory = (args) => {
  return <ContactItem {...args} />;
};
