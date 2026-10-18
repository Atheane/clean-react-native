import { StyleProp, ViewStyle } from 'react-native';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Love, Validate, PrimaryButton, Colors } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const PrimaryButtonMeta: ComponentMeta<typeof PrimaryButton> = {
  title: 'Buttons/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
    iconOne: { table: { disable: true } },
    iconTwo: { table: { disable: true } },
  },
  args: {
    title: 'Sign up',
    large: false,
    uppercase: true,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default PrimaryButtonMeta;

type PrimaryButtonStory = ComponentStory<typeof PrimaryButton>;

export const Static: PrimaryButtonStory = (args) => <PrimaryButton {...args} />;
export const OneIcon: PrimaryButtonStory = (args) => (
  <PrimaryButton
    iconOne={() => (
      <Love width={23} height={23} style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>} />
    )}
    {...args}
  />
);
export const TwoIcons: PrimaryButtonStory = (args) => {
  return (
    <PrimaryButton
      iconOne={() => (
        <Love width={23} height={23} style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>} />
      )}
      iconTwo={() => (
        <Validate
          width={23}
          height={23}
          style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>}
        />
      )}
      {...args}
    />
  );
};
