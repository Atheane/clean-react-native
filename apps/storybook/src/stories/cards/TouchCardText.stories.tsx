import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { useTranslation } from 'react-i18next';

import { TouchCardText } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const TouchCardTextMeta: ComponentMeta<typeof TouchCardText> = {
  title: 'Cards/TouchCardText',
  component: TouchCardText,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default TouchCardTextMeta;

type TouchCardTextStory = ComponentStory<typeof TouchCardText>;

export const Static: TouchCardTextStory = (args) => {
  const { t } = useTranslation();
  return <TouchCardText {...args} text={t('screens.carbon.reward')} />;
};
