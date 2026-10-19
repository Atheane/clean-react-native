import { useTranslation } from 'react-i18next';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { SubmitButton } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const SubmitButtonMeta: ComponentMeta<typeof SubmitButton> = {
  title: 'Buttons/SubmitButton',
  component: SubmitButton,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    title: 'Valider',
    uppercase: false,
    disabled: false,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default SubmitButtonMeta;

export const Static: ComponentStory<typeof SubmitButton> = (args) => {
  const { t } = useTranslation();
  return <SubmitButton {...args} title={t('button.submit')} />;
};
