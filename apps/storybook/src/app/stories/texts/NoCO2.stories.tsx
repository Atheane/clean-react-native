import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { useTranslation } from 'react-i18next';

import { NoCO2 } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const NoCO2Meta: ComponentMeta<typeof NoCO2> = {
  title: 'Texts/NoCO2',
  component: NoCO2,
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default NoCO2Meta;

type NoCO2Story = ComponentStory<typeof NoCO2>;

export const Static: NoCO2Story = () => {
  const { t } = useTranslation();
  return <NoCO2 text={t('screens.carbonHouse.noCO2')} />;
};
