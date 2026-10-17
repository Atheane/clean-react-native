import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { EmailInput, useEdit } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const EmailInputMeta: ComponentMeta<typeof EmailInput> = {
  title: 'Inputs/EmailInput',
  component: EmailInput,
  argTypes: {
    onEdit: { action: 'onEdit' },
    onChange: {
      action: 'onChange',
    },
    onFocus: {
      action: 'onFocus',
    },
  },
  args: {
    email: 'thisisaveryveryveryverylongemail@gmail.com',
    filled: true,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default EmailInputMeta;

export const Dynamic: ComponentStory<typeof EmailInput> = (args) => {
  const { filled, onEdit } = useEdit(true);
  return <EmailInput {...args} filled={filled} onEdit={onEdit} />;
};
