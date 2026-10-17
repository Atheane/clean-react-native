import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { TouchCardKpi, House, Colors } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../wrappers';
import { StyleProp, ViewStyle } from 'react-native';

const TouchCardKpiMeta: ComponentMeta<typeof TouchCardKpi> = {
  title: 'Cards/TouchCardKpi',
  component: TouchCardKpi,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    icon: () => <House style={{ color: Colors.icon.darkBlue } as StyleProp<ViewStyle>} />,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default TouchCardKpiMeta;

type TouchCardKpiStory = ComponentStory<typeof TouchCardKpi>;

export const Empty: TouchCardKpiStory = (args) => <TouchCardKpi {...args} />;
export const WithData: TouchCardKpiStory = (args) => (
  <TouchCardKpi
    {...args}
    data={{
      pct: '100%',
      co2: '6 tCO2',
      legend: 'Moyenne Française : 0,65 t',
    }}
  />
);
