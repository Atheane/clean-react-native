import { StyleProp, ViewStyle } from 'react-native';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { TextInput, Love, Colors } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const TextInputMeta: ComponentMeta<typeof TextInput> = {
  title: 'Validated/Shared/TextInput',
  component: TextInput,
  argTypes: {
    onChange: {
      action: 'onChange',
    },
    onBlur: {
      action: 'onBlur',
    },
    onFocus: {
      action: 'onFocus',
    },
  },
  args: {
    label: 'Firstname',
    lowerCase: false,
    icon: () => (
      <Love
        width={27}
        height={27}
        style={{ color: Colors.icon.lightGreenTransparent } as StyleProp<ViewStyle>}
      />
    ),
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default TextInputMeta;

type TextInputStory = ComponentStory<typeof TextInput>;

export const Static: TextInputStory = (args) => <TextInput {...args} />;
export const GreyLabel: TextInputStory = (args) => <TextInput {...args} labelColor={Colors.text.grey} />;
