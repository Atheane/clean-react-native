import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { ContactEmail } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const ContactEmailMeta: ComponentMeta<typeof ContactEmail> = {
  title: 'Others/ContactEmail',
  component: ContactEmail,
  argTypes: {},
  args: {},
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default ContactEmailMeta;

type ContactEmailStory = ComponentStory<typeof ContactEmail>;

export const Basic: ContactEmailStory = (args) => <ContactEmail {...args} />;
