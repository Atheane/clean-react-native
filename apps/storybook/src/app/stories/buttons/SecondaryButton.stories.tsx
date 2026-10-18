import { StyleProp, ViewStyle } from 'react-native';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { SecondaryButton, Logout, Colors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const SecondaryButtonMeta: ComponentMeta<typeof SecondaryButton> = {
  title: 'Buttons/SecondaryButton',
  component: SecondaryButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
    iconOne: { table: { disable: true } },
  },
  args: {
    title: 'Log in',
    long: false,
    uppercase: true,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default SecondaryButtonMeta;

type SecondaryButtonStory = ComponentStory<typeof SecondaryButton>;

export const Static: SecondaryButtonStory = (args) => <SecondaryButton {...args} />;
export const Icon: SecondaryButtonStory = (args) => (
  <SecondaryButton
    iconOne={() => (
      <Logout
        width={27}
        height={27}
        style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    )}
    {...args}
  />
);
