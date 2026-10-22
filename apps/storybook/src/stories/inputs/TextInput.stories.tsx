import { StyleProp, ViewStyle } from 'react-native';

import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { TextInput, Love, Colors, GreenEuroAmount } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const TextInputMeta: ComponentMeta<typeof TextInput> = {
  title: 'Inputs/TextInput',
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
    label: 'Label',
    lowerCase: false,
    IconLeft: () => (
      <Love
        width={27}
        height={27}
        style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    ),
    short: false,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default TextInputMeta;

type TextInputStory = ComponentStory<typeof TextInput>;

export const TextPinkLabel: TextInputStory = (args) => {
  return <TextInput {...args} />;
};
export const TextGreyLabel: TextInputStory = (args) => {
  return <TextInput {...args} labelColor={Colors.bank.primary.grey} />;
};

export const NumericPinkLabel: TextInputStory = (args) => {
  return <TextInput {...args} numeric />;
};

export const GreenEuroAmountPinkLabel: TextInputStory = (args) => {
  return (
    <TextInput
      {...args}
      label={'Amount'}
      labelColor={Colors.bank.primary.grey}
      numeric
      IconRight={GreenEuroAmount}
      IconLeft={undefined}
      short={true}
    />
  );
};
