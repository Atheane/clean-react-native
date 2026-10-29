import type { Meta, StoryObj } from '@storybook/react';
import { ModalContent } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';
import { BilanChampionEN } from '../../../assets/images';
import { CardCarbonFootPrint } from '../../../assets/svg';

const meta = {
  title: 'Modals/ModalContent',
  component: ModalContent,
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
} as Meta<typeof ModalContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    text: "Here's today's quiz: What is a key benefit of installing air quality/temperature sensors in residential buildings?​\nA) Decreasing energy consumption\n​B) Reducing noise pollution\n​C) Increasing ventilation efficiency",
  },
};

export const Title: Story = {
  args: {
    title: 'Quiz on air quality',
    text: "Here's today's quiz: What is a key benefit of installing air quality/temperature sensors in residential buildings?​\nA) Decreasing energy consumption\n​B) Reducing noise pollution\n​C) Increasing ventilation efficiency",
  },
};

export const Img: Story = {
  args: {
    title: 'Quiz on air quality',
    img: BilanChampionEN,
    text: "Here's today's quiz: What is a key benefit of installing air quality/temperature sensors in residential buildings?​\nA) Decreasing energy consumption\n​B) Reducing noise pollution\n​C) Increasing ventilation efficiency",
    imgWidth: 200,
    imgHeight: 200,
  },
};

export const Icon: Story = {
  args: {
    title: 'Quiz on air quality',
    icon: CardCarbonFootPrint,
    text: "Here's today's quiz: What is a key benefit of installing air quality/temperature sensors in residential buildings?​\nA) Decreasing energy consumption\n​B) Reducing noise pollution\n​C) Increasing ventilation efficiency",
  },
};
