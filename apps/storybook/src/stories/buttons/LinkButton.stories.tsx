import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { useTranslation } from 'react-i18next';

import { LinkButton, LinkButtonColors, Phone } from '@clean-rn/ui-mobile';

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
    colorOption: LinkButtonColors.GREEN,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default LinkButtonMeta;

export const NoIcon: ComponentStory<typeof LinkButton> = (args) => {
  const { t } = useTranslation();
  return <LinkButton {...args} title={t('login.forgotten-password')} />;
};

export const Arrow: ComponentStory<typeof LinkButton> = (args) => {
  const { t } = useTranslation();
  return <LinkButton {...args} title={t('login.forgotten-password')} arrow={true} />;
};

export const IconLeft: ComponentStory<typeof LinkButton> = (args) => {
  const { t } = useTranslation();
  return <LinkButton {...args} title={t('login.forgotten-password')} iconLeft={Phone} />;
};

export const IconRight: ComponentStory<typeof LinkButton> = (args) => {
  const { t } = useTranslation();
  return <LinkButton {...args} title={t('login.forgotten-password')} iconRight={Phone} />;
};

export const IconLeftRight: ComponentStory<typeof LinkButton> = (args) => {
  const { t } = useTranslation();
  return <LinkButton {...args} title={t('login.forgotten-password')} iconLeft={Phone} iconRight={Phone} />;
};
