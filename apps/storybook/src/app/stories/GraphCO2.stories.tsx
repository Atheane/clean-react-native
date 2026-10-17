import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { GraphCO2 } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus } from '../wrappers';

const GraphCO2Meta: ComponentMeta<typeof GraphCO2> = {
  title: 'Others/GraphCO2',
  component: GraphCO2,
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
  args: {
    emissions: 500,
  },
};

export default GraphCO2Meta;

type GraphCO2Story = ComponentStory<typeof GraphCO2>;

export const Cop21: GraphCO2Story = (args) => <GraphCO2 {...args} />;
export const Champion: GraphCO2Story = () => <GraphCO2 emissions={1000} />;
export const France: GraphCO2Story = () => <GraphCO2 emissions={2000} />;
export const Bad: GraphCO2Story = () => <GraphCO2 emissions={5000} />;
