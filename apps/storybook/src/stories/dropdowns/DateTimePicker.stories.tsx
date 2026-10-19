import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { useTranslation } from 'react-i18next';

import { DateTimePicker } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const DateTimePickerMeta: ComponentMeta<typeof DateTimePicker> = {
  title: 'Dropdowns/DateTimePicker',
  component: DateTimePicker,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'test',
    format: 'DD/MM/YYYY',
    placeholder: 'placeholder',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default DateTimePickerMeta;

export const Dynamic: ComponentStory<typeof DateTimePicker> = (args) => {
  const { t } = useTranslation();
  return (
    <DateTimePicker {...args} label={t('date-picker.label')} placeholder={t('date-picker.placeholder')} />
  );
};
