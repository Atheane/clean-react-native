import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { TabCO2Reward } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const TabCO2RewardMeta: ComponentMeta<typeof TabCO2Reward> = {
  title: 'Tabs/CO2Reward',
  component: TabCO2Reward,
  args: {
    tableHead: ['Prime CO2', 'Emissions'],
    tableData: [
      ['N.A', 'N.A'],
      ['59€G', '1987 kg CO2'],
      ['59€G', '2039 kg CO2'],
      ['59€G', '2139 kg CO2'],
    ],
    rowLabels: ['2024', '2023', '2022', '2021'],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default TabCO2RewardMeta;

export const TwoColumns: ComponentStory<typeof TabCO2Reward> = (args) => {
  return <TabCO2Reward {...args} />;
};
