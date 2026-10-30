import type { Meta, StoryObj } from '@storybook/react';
import { StackedBars } from '../../src/components/charts/stacked-bars';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Charts/StackedBars',
  component: StackedBars,
  argTypes: {},
  decorators: [WithCenterView],
} satisfies Meta<typeof StackedBars>;

export default meta;

type Story = StoryObj<typeof meta>;

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
const transportDay = [0.4, 0.3, 0.3, 0.4, 1, 1.2, 0.6, 0.5, 0.4, 1, 2, 1.5];
const housingDay = [0.1, 0.1, 0.1, 0.2, 0.3, 0.4, 0.2, 0.1, 0.2, 0.3, 0.7, 0.5];
const savingsDay = [0.03, 0.03, 0.07, 0.04, 0.1, 0.1, 0.04, 0.05, 0.04, 0.08, 0.2, 0.15];

export const DailyConsumption: Story = {
  args: {
    categories: ['Transport', 'Logement', 'CO2 Evité'],
    labels: labelsDay,
    transport: transportDay,
    housing: housingDay,
    savings: savingsDay,
  },
};

const labelsWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const transportWeek = [4.4, 3.1, 3.2, 4.5, 2.5, 1.2, 0.6];
const housingWeek = [0.1, 0.1, 0.1, 0.2, 0.3, 0.4, 0.2];
const savingsWeek = [0.3, 0.3, 0.7, 0.4, 0.1, 0.3, 0.4];

export const WeeklyConsumption: Story = {
  args: {
    categories: ['Transport', 'Logement', 'CO2 Evité'],
    labels: labelsWeek,
    transport: transportWeek,
    housing: housingWeek,
    savings: savingsWeek,
  },
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
const transportMonth = [4, 3, 3, 4, 1, 1.2, 0.6, 5, 4, 1, 2, 1.5, 3, 3, 7, 4];
const housingMonth = [0.1, 0.1, 0.1, 0.2, 0.3, 0.4, 0.2, 0.1, 0.2, 0.3, 0.7, 0.5, 0.3, 0.3, 0.7, 0.4];
const savingsMonth = [0.3, 0.3, 0.7, 0.4, 0.1, 0.1, 0.4, 0.5, 0.4, 0.8, 0.2, 0.15, 0.3, 0.3, 0.7, 0.4];

export const MonthlyConsumption: Story = {
  args: {
    categories: ['Transport', 'Logement', 'CO2 Evité'],
    labels: labelsMonth,
    transport: transportMonth,
    housing: housingMonth,
    savings: savingsMonth,
  },
};

const labelsYear = ['2018', '2019', '2020', '2021', '2022', '2023'];
const transportYear = [4000, 3100, 3200, 3000, 0, 0];
const housingYear = [1000, 1100, 1100, 1000, 1000, 400];
const savingsYear = [0, 800, 700, 1000, 4000, 4600];

export const YearlyConsumption: Story = {
  args: {
    categories: ['Transport', 'Logement', 'CO2 Evité'],
    labels: labelsYear,
    transport: transportYear,
    housing: housingYear,
    savings: savingsYear,
  },
};

export const NoData: Story = {
  args: {
    categories: [],
    labels: [],
    transport: [],
    housing: [],
    savings: [],
  },
};
