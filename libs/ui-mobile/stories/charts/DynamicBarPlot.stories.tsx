import type { Meta, StoryObj } from '@storybook/react';
import { DynamicBarPlot } from '../../src/components/charts/dynamic-bar-plot';
import { Colors } from '../../src/constants';

import { WithCenterView } from '../../wrappers';

// level 1
const parentData = [
  ['Jan', 124.5, 'month', 'jan'],
  ['Feb', 123.5, 'month', 'feb'],
  ['Mar', 122.5, 'month', 'mar'],
  ['Apr', 85.5, 'month', 'apr'],
  ['May', 70.5, 'month', 'may'],
  ['Jun', 71.5, 'month', 'jun'],
  ['Jul', 64.5, 'month', 'jul'],
  ['Aug', 50.5, 'month', 'aug'],
  ['Sep', 67.5, 'month', 'sep'],
  ['Oct', 77.5, 'month', 'oct'],
  ['Nov', 97.5, 'month', 'nov'],
  ['Dec', 123.5, 'month', 'dec'],
];

function generateRandomValue(baseValue, variance = 0.2) {
  return baseValue + (Math.random() - 0.5) * baseValue * variance;
}

function generateDaysData(month, baseValue, monthCode) {
  const daysInMonth = new Date(2023, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const dayValue = generateRandomValue(baseValue / daysInMonth);
    return [`${i + 1}`, dayValue, monthCode, `${monthCode}_${i + 1}`];
  });
}

function generateHoursData(day, month, baseValue, dayCode) {
  return Array.from({ length: 24 }, (_, i) => {
    const hourValue = generateRandomValue(baseValue / 24);
    return [`${i.toString().padStart(2, '0')}:00`, hourValue, dayCode, `${dayCode}_${i}`];
  });
}

const monthsData = {};
const daysData = {};

parentData.forEach(([monthName, monthValue, _, monthCode], monthIndex) => {
  monthsData[monthCode] = generateDaysData(monthIndex, monthValue, monthCode);

  monthsData[monthCode].forEach(([day, dayValue, _, dayCode]) => {
    daysData[dayCode] = generateHoursData(day, monthIndex, dayValue, dayCode);
  });
});

const allData = [parentData, ...Object.values(monthsData), ...Object.values(daysData)];

const meta = {
  title: 'Charts/DynamicBarPlot',
  component: DynamicBarPlot,
  argTypes: {},
  decorators: [WithCenterView],
} satisfies Meta<typeof DynamicBarPlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const One: Story = {
  args: {
    initialData: parentData,
    allData: allData,
    color: Colors.primary.darkBlue,
    xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yAxisLabel: 'kWh',
  },
};
