import React from 'react';
import { ImageSourcePropType, StyleSheet, View, Text, Image } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import {
  HeaderBad,
  HeaderFrance,
  HeaderChampion,
  HeaderCop21,
  BilanBadFR,
  BilanBadEN,
  BilanFranceFR,
  BilanFranceEN,
  BilanChampionEN,
  BilanChampionFR,
  BilanCop21FR,
  BilanCop21EN,
  GraphCO2,
  LongCardIcon,
  RightChevron,
  Carbon,
  Quiz,
  GreenEuro,
  Colors,
  getColor,
  FontNames,
} from '@clean-rn/ui-mobile';
import { WithCenterView } from '../../wrappers';

enum IBANKCategories {
  BAD = 'bad',
  FRANCE = 'france',
  CHAMPION = 'champion',
  COP21 = 'cop21',
}

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

export const Basic: Story = {
  args: {
    text: 'Current month',
    leftIcon: () => <Carbon />,
    rightIcon: () => <RightChevron />,
  },
};

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

export const WithGraph: Story = {
  args: {
    text: 'Current month',
    leftIcon: () => <Carbon />,
    rightIcon: () => <RightChevron />,
    children: (
      <GraphCO2
        small
        headers={
          {
            [IBANKCategories.BAD]: HeaderBad as ImageSourcePropType,
            [IBANKCategories.FRANCE]: HeaderFrance as ImageSourcePropType,
            [IBANKCategories.CHAMPION]: HeaderChampion as ImageSourcePropType,
            [IBANKCategories.COP21]: HeaderCop21 as ImageSourcePropType,
          } as { [key: string]: ImageSourcePropType }
        }
        bilans={{
          FR: {
            [IBANKCategories.BAD]: BilanBadFR as ImageSourcePropType,
            [IBANKCategories.FRANCE]: BilanFranceFR as ImageSourcePropType,
            [IBANKCategories.CHAMPION]: BilanChampionFR as ImageSourcePropType,
            [IBANKCategories.COP21]: BilanCop21FR as ImageSourcePropType,
          } as { [key: string]: ImageSourcePropType },
          GB: {
            [IBANKCategories.BAD]: BilanBadEN as ImageSourcePropType,
            [IBANKCategories.FRANCE]: BilanFranceEN as ImageSourcePropType,
            [IBANKCategories.CHAMPION]: BilanChampionEN as ImageSourcePropType,
            [IBANKCategories.COP21]: BilanCop21EN as ImageSourcePropType,
          } as { [key: string]: ImageSourcePropType },
          US: {
            [IBANKCategories.BAD]: BilanBadEN as ImageSourcePropType,
            [IBANKCategories.FRANCE]: BilanFranceEN as ImageSourcePropType,
            [IBANKCategories.CHAMPION]: BilanChampionEN as ImageSourcePropType,
            [IBANKCategories.COP21]: BilanCop21EN as ImageSourcePropType,
          } as { [key: string]: ImageSourcePropType },
        }}
        emissions={555}
      />
    ),
  },
};
