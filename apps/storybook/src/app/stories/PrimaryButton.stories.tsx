import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Love, Validate, PrimaryButton } from '@bank/ui-mobile';

// import { withSwitch, ValidationStatus } from '../wrappers';

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
    fixedSize: false,
    pressed: false,
    uppercase: true,
  },
  decorators: [
    // (Story) => withSwitch(Story, ValidationStatus.VALIDATED)
  ],
};

export default PrimaryButtonMeta;

type PrimaryButtonStory = ComponentStory<typeof PrimaryButton>;

export const Static: PrimaryButtonStory = (args) => <PrimaryButton {...args} />;
export const OneIcon: PrimaryButtonStory = (args) => (
  <PrimaryButton iconOne={Love} {...args} />
);
export const TwoIcons: PrimaryButtonStory = (args) => {
  return <PrimaryButton iconOne={Love} iconTwo={Validate} {...args} />;
};
