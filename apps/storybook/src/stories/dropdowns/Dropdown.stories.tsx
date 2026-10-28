import { StyleProp, ViewStyle } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { sort } from 'fast-sort';

import { Flame, Department, Dropdown, Colors } from '@clean-rn/ui-mobile';
import { IHeatingType, departmentsFR, IDepartment } from '@clean-rn/carbon/domain';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const translations = {
  electricity: 'Electricity',
  charcoal: 'Coal',
  town_gas: 'Town gas',
  domestic_fuel: 'Domestic fuel',
  urban_heating_network: 'Urban heating network',
  wood: 'Wood',
  heat_pump: 'Heating pump',
  termal_solar: 'Termal solar',
  propane: 'Propane',
};

const meta = {
  title: 'Dropdowns/Dropdown',
  component: Dropdown,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },

  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const sortedDeps = sort(departmentsFR)
  .asc((dep: IDepartment) => dep.NCC)
  .map((dep: IDepartment) => ({
    key: dep.DEP,
    value: dep.NCC,
  }));

export const HeatingTypes: Story = {
  args: {
    label: 'Heating type',
    placeholder: 'Heating type',
    data: Object.entries(IHeatingType).map(([key, value]) => ({
      key,
      value: translations[value],
    })),
    icon: () => <Flame style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />,
  },
};

export const Departments: Story = {
  args: {
    label: 'Departments',
    placeholder: 'Departments',
    data: sortedDeps,
    icon: () => <Department style={{ color: Colors.primary.lightGreen } as StyleProp<ViewStyle>} />,
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
