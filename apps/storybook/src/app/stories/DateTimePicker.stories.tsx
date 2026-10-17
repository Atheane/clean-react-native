import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { DateTimePicker } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../wrappers';

const DateTimePickerMeta: ComponentMeta<typeof DateTimePicker> = {
  title: 'Dropdowns/DateTimePicker',
  component: DateTimePicker,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'Date de naissance',
    format: 'DD/MM/YYYY',
    placeholder: 'Date de naissance',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default DateTimePickerMeta;

export const Dynamic: ComponentStory<typeof DateTimePicker> = (args) => <DateTimePicker {...args} />;
