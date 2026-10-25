import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { StackedBars } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const StackedBarsMeta: ComponentMeta<typeof StackedBars> = {
  title: 'Charts/StackedBars',
  component: StackedBars,
  argTypes: {},
  args: {
    labels: [],
    consumption: [],
    savings: [],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default StackedBarsMeta;

type StackedBarsStory = ComponentStory<typeof StackedBars>;

const labelsDay = [
  '0:00',
  '2:00',
  '4:00',
  '6:00',
  '8:00',
  '10:00',
  '12:00',
  '14:00',
  '16:00',
  '18:00',
  '20:00',
  '22:00',
];
const consumptionDay = [0.4, 0.3, 0.3, 0.4, 1, 1.2, 0.6, 0.5, 0.4, 1, 2, 1.5];
const savingsDay = [0.03, 0.03, 0.07, 0.04, 0.1, 0.1, 0.04, 0.05, 0.04, 0.08, 0.2, 0.15];

export const DailyConsumption: StackedBarsStory = (args) => {
  return <StackedBars labels={labelsDay} consumption={consumptionDay} savings={savingsDay} />;
};

const labelsWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const consumptionWeek = [4.4, 3.1, 3.2, 4.5, 2.5, 1.2, 0.6];
const savingsWeek = [0.3, 0.3, 0.7, 0.4, 0.1, 0.3, 0.4];

export const WeeklyConsumption: StackedBarsStory = (args) => {
  return <StackedBars labels={labelsWeek} consumption={consumptionWeek} savings={savingsWeek} />;
};

const labelsMonth = [
  '01',
  '03',
  '05',
  '07',
  '09',
  '11',
  '13',
  '15',
  '17',
  '19',
  '21',
  '23',
  '25',
  '27',
  '29',
  '31',
];
const consumptionMonth = [4, 3, 3, 4, 1, 1.2, 0.6, 5, 4, 1, 2, 1.5, 3, 3, 7, 4];
const savingsMonth = [0.3, 0.3, 0.7, 0.4, 0.1, 0.1, 0.4, 0.5, 0.4, 0.8, 0.2, 0.15, 0.3, 0.3, 0.7, 0.4];

export const MonthlyConsumption: StackedBarsStory = (args) => {
  return <StackedBars labels={labelsMonth} consumption={consumptionMonth} savings={savingsMonth} />;
};
