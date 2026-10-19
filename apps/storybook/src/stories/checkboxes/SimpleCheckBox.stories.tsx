import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { useTranslation } from 'react-i18next';
import { SimpleCheckBox, useChange } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const SimpleCheckBoxMeta: ComponentMeta<typeof SimpleCheckBox> = {
  title: 'Checkboxes/SimpleCheckBox',
  component: SimpleCheckBox,
  argTypes: {
    toggleCheckbox: { action: 'toggleCheckbox' },
  },
  args: {
    checked: true,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default SimpleCheckBoxMeta;

export const Static: ComponentStory<typeof SimpleCheckBox> = (args) => {
  const { t } = useTranslation();
  return <SimpleCheckBox {...args} title={t('screens.signup-email.checkbox')} />;
};

export const Dynamic: ComponentStory<typeof SimpleCheckBox> = (args) => {
  const { t } = useTranslation();
  const { value, onChange } = useChange(false);
  return (
    <SimpleCheckBox
      {...args}
      title={t('screens.signup-email.checkbox')}
      checked={value as boolean}
      toggleCheckbox={onChange}
    />
  );
};
