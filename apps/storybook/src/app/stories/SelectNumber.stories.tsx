import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { SelectNumber, Surface } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const SelectNumberMeta: ComponentMeta<typeof SelectNumber> = {
  title: 'Validated/Shared/SelectNumber',
  component: SelectNumber,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Surface',
    icon: Surface,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default SelectNumberMeta;

type SelectNumberStory = ComponentStory<typeof SelectNumber>;

export const Static: SelectNumberStory = (args) => <SelectNumber {...args} />;
