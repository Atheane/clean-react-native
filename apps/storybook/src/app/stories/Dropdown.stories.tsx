import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { sort } from 'fast-sort';

import { Flame, Department, Dropdown } from '@clean-rn/ui-mobile';
// import { IHeatingType } from '@carbon/domain/types';

// import departments from '@carbon/domain/constants/departments/fr.json';

import { WithSwitch, ValidationStatus } from '../wrappers';

export enum IHeatingType {
  ELECTRICTY = 'electricity',
  CHARCOAL = 'charcoal',
  TOWN_GAS = 'town_gas',
  DOMESTIC_FUEL = 'domestic_fuel',
  URBAN_HEATING_NETWORK = 'urban_heating_network',
  WOOD = 'wood',
  HEAT_PUMP = 'heat_pump',
  TERMAL_SOLAR = 'termal_solar',
  PROPANE = 'propane',
}

const translations = {
  electricity: 'Electricité',
  charcoal: 'Charbon',
  town_gas: 'Gaz de ville',
  domestic_fuel: 'Fioul domestique',
  urban_heating_network: 'Réseau de chaleur urbain',
  wood: 'Bois',
  heat_pump: 'Pompe à chaleur',
  termal_solar: 'Solaire thermique',
  propane: 'Propane',
};

const DropdownMeta: ComponentMeta<typeof Dropdown> = {
  title: 'Pending/Shared/Dropdown',
  component: Dropdown,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  args: {
    label: 'Type de chauffage',
    placeholder: 'Type de chauffage',
    data: Object.entries(IHeatingType).map(([key, value]) => ({
      key,
      value: translations[value],
    })),
    icon: Flame,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.PENDING)],
};

export default DropdownMeta;

type DropdownStory = ComponentStory<typeof Dropdown>;

// const sortedDeps = sort(departments)
//   .asc((dep) => dep.NCC)
//   .map((dep) => ({
//     key: dep.DEP,
//     value: dep.NCC,
//   }));

export const HeatingTypes: DropdownStory = (args) => <Dropdown {...args} />;
export const Departments: DropdownStory = (args) => (
  <Dropdown
    {...args}
    label={'State departments'}
    placeholder={'State department'}
    data={[]}
    icon={Department}
  />
);
