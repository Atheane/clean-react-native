import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { IDCard, IconTextItem } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';
import { useTranslation } from 'react-i18next';

const IconTextItemMeta: ComponentMeta<typeof IconTextItem> = {
  title: 'Others/IconTextItem',
  component: IconTextItem,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
  args: {
    icon: IDCard,
    text: 'ID Card',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default IconTextItemMeta;

type IconTextItemStory = ComponentStory<typeof IconTextItem>;

export const Static: IconTextItemStory = (args) => {
  const { t } = useTranslation();
  return <IconTextItem {...args} text={t('screens.kyc.first-id.id')} />;
};
