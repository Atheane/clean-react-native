import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { GreenBackButton } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const GreenBackButtonMeta: ComponentMeta<typeof GreenBackButton> = {
  title: 'Validated/Shared/GreenBackButton',
  component: GreenBackButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default GreenBackButtonMeta;

export const Static: ComponentStory<typeof GreenBackButton> = (args) => <GreenBackButton {...args} />;
