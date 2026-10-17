import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { GreenBackButton } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../wrappers';

const GreenBackButtonMeta: ComponentMeta<typeof GreenBackButton> = {
  title: 'Buttons/GreenBackButton',
  component: GreenBackButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default GreenBackButtonMeta;

export const Static: ComponentStory<typeof GreenBackButton> = (args) => <GreenBackButton {...args} />;
