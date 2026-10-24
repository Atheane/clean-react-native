import { StyleProp, ViewStyle } from 'react-native';

import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { IbanInput, Colors, Love } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const IbanInputMeta: ComponentMeta<typeof IbanInput> = {
  title: 'Inputs/IbanInput',
  component: IbanInput,
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

export default IbanInputMeta;

type IbanInputStory = ComponentStory<typeof IbanInput>;

export const TextPinkLabel: IbanInputStory = (args) => {
  return <IbanInput {...args} />;
};
export const TextGreyLabel: IbanInputStory = (args) => {
  return <IbanInput {...args} labelColor={Colors.bank.primary.grey} />;
};
