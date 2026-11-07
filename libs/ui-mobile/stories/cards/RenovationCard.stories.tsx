import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RenovationCard } from '../../src/components/cards/renovation-card';

const meta = {
  title: 'Cards/RenovationCard',
  component: RenovationCard,
} satisfies Meta<typeof RenovationCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Winter: Story = {
  args: {
    season: 'winter',
    textHeader: 'Hiver',
    textTagLeft: 'Avant',
    textTagRight: 'Après',
    textkWhLeft: '200 kWh',
    textPriceLeft: '30 €',
    textGranularity: 'par mois*',
    textkWhRight: '170 kWh',
    textPriceRight: '25,5 €',
    footerText: 'Économisez 300 kWh par an,\nSoit 45€ par an, avant\naugmentation du prix de l’énergie !',
  },
};

export const Summer: Story = {
  args: {
    season: 'summer',
    textHeader: 'Eté',
    textTagLeft: 'Avant',
    textTagRight: 'Après',
    textkWhLeft: '100 kWh',
    textPriceLeft: '15 €',
    textGranularity: 'par mois*',
    textkWhRight: '80 kWh',
    textPriceRight: '12 €',
    footerText: 'Économisez 300 kWh par an,\nSoit 45€ par an, avant\naugmentation du prix de l’énergie !',
  },
};
