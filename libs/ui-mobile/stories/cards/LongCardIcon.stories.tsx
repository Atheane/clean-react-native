import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { LongCardIcon } from '../../src/components/cards/long-card-icon';
import { RightChevron, Quiz } from '../../src/assets/svg';
import { GreenEuro } from '../../src/assets/images';
import { Colors, FontNames } from '../../src/constants';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/LongCardIcon',
  component: LongCardIcon,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [WithCenterView],
} satisfies Meta<typeof LongCardIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: 'Current month',
    leftIcon: () => <Quiz style={{ marginTop: 8 }} />,
    rightIcon: () => <RightChevron startColor={Colors.primary.darkBlue} endColor={Colors.secondary.pink} />,
  },
};

const styles = StyleSheet.create({
  greenEurosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary.lightPurple,
    width: '90%',
    height: 40,
    marginVertical: 8,
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: Platform.OS === 'web' ? 20 : 0,
  },
  imgContainer: {
    marginBottom: 10,
  },
  greenEuroImg: {
    marginTop: 8,
    width: 44,
    height: 44,
  },
  darkBlueText: { fontSize: 14, fontFamily: FontNames.MartelSans_700Bold, color: Colors.primary.darkBlue },
  whiteText: { fontSize: 14, fontFamily: FontNames.MartelSans_700Bold, color: Colors.primary.white },
});

const GreenEuros = () => {
  return (
    <View style={styles.greenEurosContainer}>
      <Text style={styles.darkBlueText}>Total €G won: </Text>
      <Text style={styles.whiteText}>15,82</Text>
      <View style={styles.imgContainer}>
        <Image source={GreenEuro} style={styles.greenEuroImg} />
      </View>
    </View>
  );
};

export const WithGEuros: Story = {
  args: {
    text: 'Current month',
    leftIcon: () => <Quiz style={{ marginTop: 8 }} />,
    rightIcon: () => <RightChevron startColor={Colors.primary.darkBlue} endColor={Colors.secondary.pink} />,
    children: <GreenEuros />,
  },
};
