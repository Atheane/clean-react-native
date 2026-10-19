import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { useTranslation } from 'react-i18next';

import { LinkButton, LinkButtonColors, useTogglePress } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const LinkButtonMeta: ComponentMeta<typeof LinkButton> = {
  title: 'Buttons/LinkButton',
  component: LinkButton,
  argTypes: {
    onPress: { action: 'onPress' },
    colorOption: {
      options: [LinkButtonColors.GREEN, LinkButtonColors.PINK, LinkButtonColors.BLUE],
      control: { type: 'radio' },
    },
  },
  args: {
    pressed: false,
    arrow: true,
    colorOption: LinkButtonColors.GREEN,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default LinkButtonMeta;

export const Static: ComponentStory<typeof LinkButton> = (args) => {
  const { t } = useTranslation();
  return <LinkButton {...args} title={t('login.forgotten-password')} />;
};
export const Dynamic: ComponentStory<typeof LinkButton> = (args) => {
  const { t } = useTranslation();

  const { pressed, onPress } = useTogglePress(false);
  return <LinkButton {...args} title={t('login.forgotten-password')} pressed={pressed} onPress={onPress} />;
};
