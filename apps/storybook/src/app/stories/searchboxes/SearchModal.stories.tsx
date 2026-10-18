import { StyleProp, ViewStyle } from 'react-native';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import { SearchModal, FlyFrom, Colors } from '@clean-rn/ui-mobile';
import { airports, IAirport } from '@clean-rn/carbon/domain';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const locales = getLocales()[0];

const data = airports.map((item: IAirport) => {
  return { key: item.IATA, value: item.name };
});

const SearchModalMeta: ComponentMeta<typeof SearchModal> = {
  title: 'SearchBoxes/SearchModal',
  component: SearchModal,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  args: {
    icon: () => <FlyFrom style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>} />,
    label: locales.currencyCode === 'FR' ? 'Aéroport de départ' : 'Departure airport',
    placeholder: locales.currencyCode === 'FR' ? 'Rechercher' : 'Search',
    data,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default SearchModalMeta;

type SearchModalStory = ComponentStory<typeof SearchModal>;

export const Airports: SearchModalStory = (args) => {
  return <SearchModal {...args} />;
};
