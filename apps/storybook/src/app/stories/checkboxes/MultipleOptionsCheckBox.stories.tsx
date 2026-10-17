import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { MultipleOptionsCheckBox } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const YesNoCheckBoxMeta: ComponentMeta<typeof MultipleOptionsCheckBox> = {
  title: 'Checkboxes/MultipleOptionsCheckBox',
  component: MultipleOptionsCheckBox,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  args: {
    label: 'I am a "person us"',
    subtitle: '(American resident)',
    optionsTitle: ['No', 'Yes'],
    optionsValues: ['0', '1'],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default YesNoCheckBoxMeta;

export const YesNo: ComponentStory<typeof MultipleOptionsCheckBox> = (args) => (
  <MultipleOptionsCheckBox {...args} />
);
export const ThreeTileOptions: ComponentStory<typeof MultipleOptionsCheckBox> = (args) => (
  <MultipleOptionsCheckBox
    optionsTitle={['Man', 'Woman', 'Neutral']}
    optionsValues={['M', 'Mrs', 'Miss']}
    subtitle={undefined}
    label={'Gender'}
    onChange={args.onChange}
  />
);
