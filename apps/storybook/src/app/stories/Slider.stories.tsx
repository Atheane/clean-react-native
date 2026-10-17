import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { useTranslation } from 'react-i18next';

import { Slider, useChange } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../wrappers';

const SliderMeta: ComponentMeta<typeof Slider> = {
  title: 'Inputs/Slider',
  component: Slider,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {
    minValue: 0,
    maxValue: 100,
    value: 50,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default SliderMeta;

type SliderStory = ComponentStory<typeof Slider>;

export const Dynamic: SliderStory = (args) => {
  const { t } = useTranslation();

  const { value, onChange } = useChange(20);
  return <Slider {...args} label={t('screens.carbon.consumption')} value={value} onChange={onChange} />;
};
export const Units: SliderStory = (args) => {
  const { value, onChange } = useChange(6);
  const { t } = useTranslation();

  return (
    <Slider
      {...args}
      label={t('screens.carbon.consumption')}
      value={value}
      onChange={onChange}
      unit={t('screens.carbonTransport.dropdown.unit')}
      minValue={0}
      maxValue={20}
    />
  );
};

export const Steps500: SliderStory = (args) => {
  const { value, onChange } = useChange(6);
  const { t } = useTranslation();

  return (
    <Slider
      {...args}
      label={t('screens.carbon.consumption')}
      value={value}
      onChange={onChange}
      unit={t('screens.carbonTransport.slider.unit')}
      minValue={0}
      maxValue={20000}
      step={500}
    />
  );
};

export const Short: SliderStory = () => {
  const { value, onChange } = useChange(50);
  const { t } = useTranslation();

  return (
    <Slider
      label={t('screens.carbonFood.slider.meatRed')}
      minValue={0}
      maxValue={14}
      value={value}
      onChange={onChange}
      short
      unit={t('screens.carbonFood.slider.unit')}
    />
  );
};
