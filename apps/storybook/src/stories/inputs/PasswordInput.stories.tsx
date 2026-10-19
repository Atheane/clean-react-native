import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { PasswordInput, useSecure } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const PasswordInputMeta: ComponentMeta<typeof PasswordInput> = {
  title: 'Inputs/PasswordInput',
  component: PasswordInput,
  argTypes: {
    onToggleSecurity: { action: 'onToggleSecurity' },
    onChange: { action: 'onChange' },
    onBlur: { action: 'onBlur' },
    onFocus: { action: 'onFocus' },
  },
  args: {
    secured: true,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default PasswordInputMeta;

export const Static: ComponentStory<typeof PasswordInput> = (args) => <PasswordInput {...args} />;
export const Dynamic: ComponentStory<typeof PasswordInput> = (args) => {
  const { secured, onToggleSecurity } = useSecure(true);
  return <PasswordInput {...args} secured={secured} onToggleSecurity={onToggleSecurity} />;
};
