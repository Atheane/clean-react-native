import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { SmallSwitchButton, useTogglePress } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const SmallSwitchButtonMeta: ComponentMeta<typeof SmallSwitchButton> = {
  title: 'Buttons/SmallSwitchButton',
  component: SmallSwitchButton,
  argTypes: {
    onToggle: { action: 'onToggle' },
  },
  args: {
    checked: false,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default SmallSwitchButtonMeta;

type SmallSwitchButtonStory = ComponentStory<typeof SmallSwitchButton>;

export const Static: SmallSwitchButtonStory = (args) => {
  return <SmallSwitchButton {...args} />;
};

export const Dynamic: SmallSwitchButtonStory = (args) => {
  const { pressed, onPress } = useTogglePress(false);
  return <SmallSwitchButton checked={pressed} onToggle={onPress} />;
};
