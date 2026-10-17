import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { LinkButton, LinkButtonColors, useTogglePress } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const LinkButtonMeta: ComponentMeta<typeof LinkButton> = {
  title: 'Buttons/LinkButton',
  component: LinkButton,
  argTypes: {
    onPress: { action: 'onPress' },
    colorOption: {
      options: [LinkButtonColors.GREEN, LinkButtonColors.PINK, LinkButtonColors.BLUE],
      control: { type: 'radio' },
    },
  },
  args: {
    title: 'Forgotten password?',
    pressed: false,
    arrow: true,
    colorOption: LinkButtonColors.GREEN,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default LinkButtonMeta;

export const Static: ComponentStory<typeof LinkButton> = (args) => <LinkButton {...args} />;
export const Dynamic: ComponentStory<typeof LinkButton> = (args) => {
  const { pressed, onPress } = useTogglePress(false);
  return <LinkButton {...args} pressed={pressed} onPress={onPress} />;
};
