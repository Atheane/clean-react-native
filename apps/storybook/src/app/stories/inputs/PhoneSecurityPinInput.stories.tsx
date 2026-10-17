import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { PhoneSecurityPinInput } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const PhoneSecurityPinInputMeta: ComponentMeta<typeof PhoneSecurityPinInput> = {
  title: 'Inputs/PhoneSecurityPinInput',
  component: PhoneSecurityPinInput,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {},
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default PhoneSecurityPinInputMeta;

export const Dynamic: ComponentStory<typeof PhoneSecurityPinInput> = (args) => (
  <PhoneSecurityPinInput {...args} />
);
