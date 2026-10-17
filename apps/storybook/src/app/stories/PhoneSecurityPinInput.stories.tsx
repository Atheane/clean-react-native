import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { PhoneSecurityPinInput } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const PhoneSecurityPinInputMeta: ComponentMeta<typeof PhoneSecurityPinInput> = {
  title: 'Validated/Auth/PhoneSecurityPinInput',
  component: PhoneSecurityPinInput,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {},
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default PhoneSecurityPinInputMeta;

export const Dynamic: ComponentStory<typeof PhoneSecurityPinInput> = (args) => (
  <PhoneSecurityPinInput {...args} />
);
