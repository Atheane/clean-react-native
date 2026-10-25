import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { TabCO2Split } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const TabCO2SplitMeta: ComponentMeta<typeof TabCO2Split> = {
  title: 'Tabs/CO2Split',
  component: TabCO2Split,
  args: {
    tableHead: ['Logement', 'Voiture', 'Total', 'Evité'],
    tableData: [
      ['1000 kg', '1987 kg', '2987 kg', '0 kg'],
      ['700 kg', '1787 kg', '2487 kg', '500 kg'],
      ['900 kg', '1787 kg', '2687 kg', '300 kg'],
      ['N.A', 'N.A'],
    ],
    rowLabels: ['2019-2020', '2022', '2023', '2024'],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default TabCO2SplitMeta;

export const FourColumns: ComponentStory<typeof TabCO2Split> = (args) => {
  return <TabCO2Split {...args} />;
};
