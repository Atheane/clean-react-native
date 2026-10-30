import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { sort } from 'fast-sort';

import { Department } from '../../src/assets';
import { Dropdown } from '../../src/components/dropdowns/dropdown';
import { Colors } from '../../src/constants';

import { departmentsFR, IDepartment } from '@clean-rn/footprint/domain';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Dropdowns/Dropdown',
  component: Dropdown,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },

  decorators: [WithCenterView],
} as Meta<typeof Dropdown>;

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
    placeholder: 'Departments',
    data: sortedDeps,
    icon: () => <Department color={Colors.primary.lightGreen} />,
  },
};

const accounts = [
  { key: 'bank', value: 'Bank App\n3 297,55 €' },
  { key: 'flash', value: 'Flash Mob\n98,44 €' },
  { key: 'restoflash', value: 'Restoflash\n151,55 €' },
  { key: 'vacances', value: 'Chèques vacances\n203,12 €' },
];

export const MultilineShortDropdown: Story = {
  args: {
    multiline: true,
    placeholder: 'Compte',
    data: accounts,
  },
};

export const NoIcon: Story = {
  args: {
    label: 'Label',
    placeholder: 'Select',
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
