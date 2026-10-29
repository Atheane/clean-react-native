import { View, Image } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { useTheme } from '@rneui/themed';
import { IconNode } from '@rneui/base';

import { Tabs, Group2, BankBuilding, Colors } from '@clean-rn/ui-mobile';

import { NoContact, NoBeneficiary, LoanHeater } from '../../../assets/images';

import { WithStatus, ValidationStatus } from '../../wrappers';

const ContentTab1 = () => {
  const { theme } = useTheme();
  return (
    <View style={theme.container.centeredItem}>
      <Image source={NoContact} style={{ width: 250, height: 250 }} />
    </View>
  );
};

const ContentTab2 = () => {
  const { theme } = useTheme();
  return (
    <View style={theme.container.centeredItem}>
      <Image source={NoBeneficiary} style={{ width: 250, height: 250 }} />
    </View>
  );
};

const ContentTab3 = () => {
  const { theme } = useTheme();
  return (
    <View style={theme.container.centeredItem}>
      <Image source={LoanHeater} style={{ width: 250, height: 250 }} />
    </View>
  );
};

const meta = {
  title: 'Tabs/Tabs',
  component: Tabs,
  argTypes: {
    changeTab: { action: 'changeTab' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING)],
} as Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoGreenTabs: Story = {
  args: {
    tabsCount: 2,
    icons: [Group2, BankBuilding] as IconNode[],
    contents: [<ContentTab1 />, <ContentTab2 />],
    titles: ['Champion', 'Bad'],
    color: Colors.primary.lightGreen,
  },
};

export const ThreeBlueTabs: Story = {
  args: {
    tabsCount: 3,
    icons: [] as IconNode[],
    contents: [<ContentTab1 />, <ContentTab2 />, <ContentTab3 />],
    titles: [],
    color: Colors.primary.darkBlue,
    colorInactive: Colors.primary.grey,
  },
};
