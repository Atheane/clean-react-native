import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SearchModal } from '../../src/components/searchboxes/search-modal';
import { FlyFrom } from '../../src/assets';
import { WithCenterView } from '../../wrappers';

const airports = [
  {
    name: 'Goroka Aéroport',
    city: 'Goroka',
    country: 'Papua New Guinea',
    IATA: 'GKA',
    lat: -6.081689834590001,
    lon: 145.391998291,
    passengers: 0,
  },
  {
    name: 'Madang Aéroport',
    city: 'Madang',
    country: 'Papua New Guinea',
    IATA: 'MAG',
    lat: -5.20707988739,
    lon: 145.789001465,
    passengers: 0,
  },
  {
    name: 'Mount Hagen Kagamuga Aéroport',
    city: 'Mount Hagen',
    country: 'Papua New Guinea',
    IATA: 'HGU',
    lat: -5.826789855957031,
    lon: 144.29600524902344,
    passengers: 0,
  },
  {
    name: 'Nadzab Aéroport',
    city: 'Nadzab',
    country: 'Papua New Guinea',
    IATA: 'LAE',
    lat: -6.569803,
    lon: 146.725977,
    passengers: 0,
  },
];

const data = airports.map((item: any) => {
  return { key: item.IATA, value: item.name };
});

const meta = {
  title: 'SearchBoxes/SearchModal',
  component: SearchModal,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  args: {
    icon: () => <FlyFrom />,
    data,
  },
  decorators: [WithCenterView],
} as Meta<typeof SearchModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Airports: Story = {
  args: {
    label: 'From',
    placeholder: 'Enter an airport',
    icon: () => <FlyFrom />,
    data,
  },
};
