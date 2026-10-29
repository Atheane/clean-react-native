import { useTranslation } from 'react-i18next';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { LongCardIcon, CarbonGradient, RightChevronGradient } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const LongCardIconMeta: ComponentMeta<typeof LongCardIcon> = {
  title: 'Cards/LongCardIcon',
  component: LongCardIcon,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    text: 'Current month',
    leftIcon: CarbonGradient,
    rightIcon: RightChevronGradient,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default LongCardIconMeta;

type LongCardIconStory = ComponentStory<typeof LongCardIcon>;

export const LongCard: LongCardIconStory = (args) => {
  const { t } = useTranslation();

  return <LongCardIcon {...args} text={t('screens.account-statements.cards.last-month')} />;
};
