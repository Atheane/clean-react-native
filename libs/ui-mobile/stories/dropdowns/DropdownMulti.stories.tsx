import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { sort } from 'fast-sort';

import { Department } from '../../src/assets';
import { DropdownMulti } from '../../src/components/dropdowns/dropdown-multi';
import { Colors } from '../../src/constants';

import { WithCenterView } from '../../wrappers';

type IDepartment = {
  DEP: string;
  NCC: string;
};

const departmentsFR = [
  {
    DEP: '1',
    NCC: 'AIN',
  },
  {
    DEP: '2',
    NCC: 'AISNE',
  },
  {
    DEP: '3',
    NCC: 'ALLIER',
  },
];

const meta = {
  title: 'Dropdowns/DropdownMulti',
  component: DropdownMulti,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  decorators: [WithCenterView],
} as Meta<typeof DropdownMulti>;

export default meta;

type Story = StoryObj<typeof meta>;

const sortedDeps = sort(departmentsFR)
  .asc((dep: IDepartment) => dep.NCC)
  .map((dep: IDepartment) => ({
    key: dep.DEP,
    value: dep.NCC,
  }));

export const Departments: Story = {
  args: {
    label: 'Departments',
    placeholder: 'Select Departments',
    data: sortedDeps,
    icon: () => <Department color={Colors.primary.lightGreen} />,
    defaultValue: [{ key: '1', value: 'AIN' }], // Example of pre-selected value
  },
};

const accounts = [
  { key: 'bank', value: 'Bank App\n3 297,55 €' },
  { key: 'flash', value: 'Flash Mob\n98,44 €' },
  { key: 'restoflash', value: 'Restoflash\n151,55 €' },
  { key: 'vacances', value: 'Chèques vacances\n203,12 €' },
];

export const MultilineSelection: Story = {
  args: {
    multiline: true,
    placeholder: 'Select Accounts',
    data: accounts,
    defaultValue: [
      { key: 'bank', value: 'Bank App\n3 297,55 €' },
      { key: 'flash', value: 'Flash Mob\n98,44 €' },
    ],
  },
};

export const NoIcon: Story = {
  args: {
    label: 'Multiple Selection',
    placeholder: 'Select Multiple Items',
    data: [
      {
        key: 'key1',
        value: 'value1',
      },
      {
        key: 'key2',
        value: 'value2',
      },
      {
        key: 'key3',
        value: 'value3',
      },
    ],
  },
};

export const WithDefaultValues: Story = {
  args: {
    label: 'Pre-selected Values',
    placeholder: 'Select Items',
    data: [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
      { key: 'key3', value: 'value3' },
      { key: 'key4', value: 'value4' },
    ],
    defaultValue: [
      { key: 'key1', value: 'value1' },
      { key: 'key3', value: 'value3' },
    ],
  },
};
