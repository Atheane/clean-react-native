import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { ErrorMessage } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';
import { AuthError } from '@clean-rn/auth/domain';

const ErrorMessageMeta: ComponentMeta<typeof ErrorMessage> = {
  title: 'Texts/ErrorMessage',
  component: ErrorMessage,
  args: {
    error: new AuthError.Invalid6Digits(),
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default ErrorMessageMeta;

export const AuthErrorInvalid6Digits: ComponentStory<typeof ErrorMessage> = (args) => {
  return <ErrorMessage {...args} />;
};
