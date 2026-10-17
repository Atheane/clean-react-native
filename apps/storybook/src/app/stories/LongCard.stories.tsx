import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { LongCard, ExportPdfGradient } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus } from '../wrappers';

const LongCardMeta: ComponentMeta<typeof LongCard> = {
  title: 'Cards/LongCard',
  component: LongCard,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    text: 'Current month',
    icon: ExportPdfGradient,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default LongCardMeta;

type LongCardStory = ComponentStory<typeof LongCard>;

export const Static: LongCardStory = (args) => <LongCard {...args} />;
