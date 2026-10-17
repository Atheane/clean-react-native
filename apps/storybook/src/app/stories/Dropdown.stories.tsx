import { StyleProp, ViewStyle } from 'react-native';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { sort } from 'fast-sort';

import { Flame, Department, Dropdown, Colors } from '@clean-rn/ui-mobile';
import { IHeatingType } from '@clean-rn/carbon/domain';

import { departmentsFR, IDepartment } from '@clean-rn/carbon/domain';

import { WithSwitch, ValidationStatus } from '../wrappers';

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

const DropdownMeta: ComponentMeta<typeof Dropdown> = {
  title: 'Validated/Shared/Dropdown',
  component: Dropdown,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  args: {
    label: 'Heating type',
    placeholder: 'Heating type',
    data: Object.entries(IHeatingType).map(([key, value]) => ({
      key,
      value: translations[value],
    })),
    icon: () => <Flame style={{ color: Colors.icon.lightGreenTransparent } as StyleProp<ViewStyle>} />,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default DropdownMeta;

type DropdownStory = ComponentStory<typeof Dropdown>;

const sortedDeps = sort(departmentsFR)
  .asc((dep: IDepartment) => dep.NCC)
  .map((dep: IDepartment) => ({
    key: dep.DEP,
    value: dep.NCC,
  }));

export const HeatingTypes: DropdownStory = (args) => <Dropdown {...args} />;
export const Departments: DropdownStory = (args) => (
  <Dropdown
    {...args}
    label={'State departments'}
    placeholder={'State department'}
    data={sortedDeps}
    icon={() => <Department style={{ color: Colors.icon.lightGreenTransparent } as StyleProp<ViewStyle>} />}
  />
);
