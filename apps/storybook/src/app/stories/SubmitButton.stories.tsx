import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { SubmitButton } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const SubmitButtonMeta: ComponentMeta<typeof SubmitButton> = {
  title: 'Validated/Auth/SubmitButton',
  component: SubmitButton,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    title: 'Valider',
    uppercase: false,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default SubmitButtonMeta;

export const Static: ComponentStory<typeof SubmitButton> = (args) => <SubmitButton {...args} />;
