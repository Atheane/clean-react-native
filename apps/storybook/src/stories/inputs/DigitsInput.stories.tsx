import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { DigitsInput } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const DigitsInputMeta: ComponentMeta<typeof DigitsInput> = {
  title: 'Inputs/DigitsInput',
  component: DigitsInput,
  argTypes: {
    onChange: { action: 'onChange' },
    onFocus: { action: 'onFocus' },
    onFullfill: { action: 'onFullfill' },
  },
  args: {
    numberDigits: 6,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default DigitsInputMeta;

export const SixDigits: ComponentStory<typeof DigitsInput> = (args) => <DigitsInput {...args} />;
export const FourDigits: ComponentStory<typeof DigitsInput> = (args) => (
  <DigitsInput {...args} numberDigits={4} />
);
