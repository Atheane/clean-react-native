import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { ImageSourcePropType } from 'react-native';

import { GraphCO2 } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus } from '../../wrappers';
import {
  HeaderBad,
  HeaderChampion,
  HeaderCop21,
  HeaderFrance,
  BilanBadFR,
  BilanBadEN,
  BilanChampionFR,
  BilanChampionEN,
  BilanCop21FR,
  BilanCop21EN,
  BilanFranceFR,
  BilanFranceEN,
} from '../../../../assets/images';

enum ICategories {
  BAD = 'bad',
  FRANCE = 'france',
  CHAMPION = 'champion',
  COP21 = 'cop21',
}

const GraphCO2Meta: ComponentMeta<typeof GraphCO2> = {
  title: 'Others/GraphCO2',
  component: GraphCO2,
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
  args: {
    headers: {
      [ICategories.BAD]: HeaderBad as ImageSourcePropType,
      [ICategories.FRANCE]: HeaderFrance as ImageSourcePropType,
      [ICategories.CHAMPION]: HeaderChampion as ImageSourcePropType,
      [ICategories.COP21]: HeaderCop21 as ImageSourcePropType,
    } as { [key: string]: ImageSourcePropType },
    bilans: {
      FR: {
        [ICategories.BAD]: BilanBadFR as ImageSourcePropType,
        [ICategories.FRANCE]: BilanFranceFR as ImageSourcePropType,
        [ICategories.CHAMPION]: BilanChampionFR as ImageSourcePropType,
        [ICategories.COP21]: BilanCop21FR as ImageSourcePropType,
      } as { [key: string]: ImageSourcePropType },
      GB: {
        [ICategories.BAD]: BilanBadEN as ImageSourcePropType,
        [ICategories.FRANCE]: BilanFranceEN as ImageSourcePropType,
        [ICategories.CHAMPION]: BilanChampionEN as ImageSourcePropType,
        [ICategories.COP21]: BilanCop21EN as ImageSourcePropType,
      } as { [key: string]: ImageSourcePropType },
      US: {
        [ICategories.BAD]: BilanBadEN as ImageSourcePropType,
        [ICategories.FRANCE]: BilanFranceEN as ImageSourcePropType,
        [ICategories.CHAMPION]: BilanChampionEN as ImageSourcePropType,
        [ICategories.COP21]: BilanCop21EN as ImageSourcePropType,
      } as { [key: string]: ImageSourcePropType },
    },
    emissions: 500,
  },
};

export default GraphCO2Meta;

type GraphCO2Story = ComponentStory<typeof GraphCO2>;

export const Cop21: GraphCO2Story = (args) => <GraphCO2 {...args} />;
export const Champion: GraphCO2Story = (args) => <GraphCO2 {...args} emissions={1000} />;
export const France: GraphCO2Story = (args) => <GraphCO2 {...args} emissions={2000} />;
export const Bad: GraphCO2Story = (args) => <GraphCO2 {...args} emissions={5000} />;
