import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { SwitchButton } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const SwitchButtonMeta: ComponentMeta<typeof SwitchButton> = {
  title: 'Buttons/SwitchButton',
  component: SwitchButton,
  argTypes: {
    onToggle: { action: 'onToggle' },
  },
  args: {
    label: 'Label',
    options: [
      { key: 'opt1', value: 'Option 1' },
      { key: 'opt2', value: 'Option 2' },
    ],
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.PENDING)],
};

export default SwitchButtonMeta;

type SwitchButtonStory = ComponentStory<typeof SwitchButton>;

export const Basic: SwitchButtonStory = (args) => <SwitchButton {...args} />;
