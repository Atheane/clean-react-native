import { StyleProp, ViewStyle } from 'react-native';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Colors, SelectNumber, Surface } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const SelectNumberMeta: ComponentMeta<typeof SelectNumber> = {
  title: 'Inputs/SelectNumber',
  component: SelectNumber,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Surface',
    icon: () => <Surface style={{ color: Colors.icon.lightGreenTransparent } as StyleProp<ViewStyle>} />,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default SelectNumberMeta;

type SelectNumberStory = ComponentStory<typeof SelectNumber>;

export const Static: SelectNumberStory = (args) => <SelectNumber {...args} />;
