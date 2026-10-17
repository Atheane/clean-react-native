import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { PhoneValidationCodeInput } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const PhoneValidationCodeInputMeta: ComponentMeta<typeof PhoneValidationCodeInput> = {
  title: 'Validated/Auth/PhoneValidationCodeInput',
  component: PhoneValidationCodeInput,
  argTypes: {
    onChange: { action: 'onChange' },
    onFocus: { action: 'onFocus' },
  },
  args: {},
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default PhoneValidationCodeInputMeta;

export const Dynamic: ComponentStory<typeof PhoneValidationCodeInput> = (args) => (
  <PhoneValidationCodeInput {...args} />
);
