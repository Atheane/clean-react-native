import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { SearchModal, FlyFrom } from '@clean-rn/ui-mobile';

import { airports, IAirport } from '@clean-rn/carbon/domain';

import { WithSwitch, ValidationStatus } from '../wrappers';

const data = airports.map((item: IAirport) => {
  return { key: item.IATA, value: item.name };
});

const SearchModalMeta: ComponentMeta<typeof SearchModal> = {
  title: 'Validated/Shared/SearchModal',
  component: SearchModal,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  args: {
    icon: FlyFrom,
    label: 'Aéroport de départ',
    placeholder: 'Rechercher',
    data,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default SearchModalMeta;

type SearchModalStory = ComponentStory<typeof SearchModal>;

export const Airports: SearchModalStory = (args) => {
  return <SearchModal {...args} />;
};
