import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { CopyValueClipboard, Iban as IbanIcon, Bic as BicIcon } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../wrappers';

const CopyValueClipboardMeta: ComponentMeta<typeof CopyValueClipboard> = {
  title: 'Others/CopyValueClipboard',
  component: CopyValueClipboard,
  argTypes: {},
  args: {
    value: 'FR7616798000010000215323243',
    icon: IbanIcon,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default CopyValueClipboardMeta;

type CopyValueClipboardStory = ComponentStory<typeof CopyValueClipboard>;

export const Iban: CopyValueClipboardStory = (args) => <CopyValueClipboard {...args} />;
export const Bic: CopyValueClipboardStory = (args) => (
  <CopyValueClipboard {...args} value={'TRZOFR21XXX'} icon={BicIcon} />
);
