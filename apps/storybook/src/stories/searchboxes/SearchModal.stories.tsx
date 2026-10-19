import { StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { SearchModal, FlyFrom, Colors } from '@clean-rn/ui-mobile';
import { airports, IAirport } from '@clean-rn/carbon/domain';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

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
    data,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default SearchModalMeta;

type SearchModalStory = ComponentStory<typeof SearchModal>;

export const Airports: SearchModalStory = (args) => {
  const { t } = useTranslation();

  return (
    <SearchModal
      {...args}
      label={t('screens.carbon-fly.dropdown.destination')}
      placeholder={t('screens.carbon-fly.search')}
    />
  );
};
