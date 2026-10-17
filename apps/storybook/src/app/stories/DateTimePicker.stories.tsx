import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { DateTimePicker } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const DateTimePickerMeta: ComponentMeta<typeof DateTimePicker> = {
  title: 'Validated/Auth/DateTimePicker',
  component: DateTimePicker,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Date de naissance',
    format: 'DD/MM/YYYY',
    placeholder: 'Date de naissance',
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default DateTimePickerMeta;

export const Dynamic: ComponentStory<typeof DateTimePicker> = (args) => <DateTimePicker {...args} />;
