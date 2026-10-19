import { useTranslation } from 'react-i18next';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { LongCard, ExportPdfGradient } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const LongCardMeta: ComponentMeta<typeof LongCard> = {
  title: 'Cards/LongCard',
  component: LongCard,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    text: 'Current month',
    icon: ExportPdfGradient,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default LongCardMeta;

type LongCardStory = ComponentStory<typeof LongCard>;

export const Static: LongCardStory = (args) => {
  const { t } = useTranslation();

  return <LongCard {...args} text={t('screens.account-statements.cards.last-month')} />;
};
export const Pressable: LongCardStory = (args) => {
  const { t } = useTranslation();

  return <LongCard {...args} pressable text={t('screens.account-statements.cards.last-month')} />;
};
