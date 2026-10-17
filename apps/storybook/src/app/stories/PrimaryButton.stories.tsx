import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { LoveWhite, Validate, PrimaryButton } from '@clean-rn/ui-mobile';
import { WithSwitch, ValidationStatus } from '../wrappers';

const PrimaryButtonMeta: ComponentMeta<typeof PrimaryButton> = {
  title: 'Validated/Shared/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
    iconOne: { table: { disable: true } },
    iconTwo: { table: { disable: true } },
  },
  args: {
    title: "S'inscrire",
    large: false,
    uppercase: true,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED)],
};

export default PrimaryButtonMeta;

type PrimaryButtonStory = ComponentStory<typeof PrimaryButton>;

export const Static: PrimaryButtonStory = (args) => <PrimaryButton {...args} />;
export const OneIcon: PrimaryButtonStory = (args) => <PrimaryButton iconOne={LoveWhite} {...args} />;
export const TwoIcons: PrimaryButtonStory = (args) => {
  return <PrimaryButton iconOne={LoveWhite} iconTwo={Validate} {...args} />;
};
