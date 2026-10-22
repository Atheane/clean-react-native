import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { ErrorMessage } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';
import { UserError } from '@clean-rn/user/domain';

const ErrorMessageMeta: ComponentMeta<typeof ErrorMessage> = {
  title: 'Texts/ErrorMessage',
  component: ErrorMessage,
  args: {
    error: new UserError.ValidatePhoneIncorrectPhoneCode(),
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default ErrorMessageMeta;

export const AuthErrorInvalid6Digits: ComponentStory<typeof ErrorMessage> = (args) => {
  return <ErrorMessage {...args} />;
};
