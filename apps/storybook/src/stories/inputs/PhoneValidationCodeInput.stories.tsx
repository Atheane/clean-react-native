import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { PhoneValidationCodeInput } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const PhoneValidationCodeInputMeta: ComponentMeta<typeof PhoneValidationCodeInput> = {
  title: 'Inputs/PhoneValidationCodeInput',
  component: PhoneValidationCodeInput,
  argTypes: {
    onChange: { action: 'onChange' },
    onFocus: { action: 'onFocus' },
  },
  args: {},
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default PhoneValidationCodeInputMeta;

export const Dynamic: ComponentStory<typeof PhoneValidationCodeInput> = (args) => (
  <PhoneValidationCodeInput {...args} />
);
