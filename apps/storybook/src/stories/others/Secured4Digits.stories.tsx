import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Secured4Digits } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const Secured4DigitsMeta: ComponentMeta<typeof Secured4Digits> = {
  title: 'Others/Secured4Digits',
  component: Secured4Digits,
  argTypes: {},
  args: {
    digits: [1, 2, 3, 4],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default Secured4DigitsMeta;

type Secured4DigitsStory = ComponentStory<typeof Secured4Digits>;

export const Basic: Secured4DigitsStory = (args) => <Secured4Digits {...args} />;
export const Secured: Secured4DigitsStory = (args) => <Secured4Digits {...args} hidden />;
export const Underlined: Secured4DigitsStory = (args) => <Secured4Digits {...args} underlined />;
