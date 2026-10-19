import { StyleProp, ViewStyle, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { Love, Validate, PrimaryButton, Colors, CO2 } from '@clean-rn/ui-mobile';
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
    long: false,
    uppercase: true,
    disabled: false,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default PrimaryButtonMeta;

type PrimaryButtonStory = ComponentStory<typeof PrimaryButton>;

export const Static: PrimaryButtonStory = (args) => {
  const { t } = useTranslation();
  return <PrimaryButton {...args} title={t('screens.login.title')} />;
};
export const OneIcon: PrimaryButtonStory = (args) => {
  const { t } = useTranslation();

  return (
    <PrimaryButton
      {...args}
      title={t('screens.login.title')}
      iconOne={() => (
        <Love width={23} height={23} style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>} />
      )}
    />
  );
};
export const TwoIcons: PrimaryButtonStory = (args) => {
  const { t } = useTranslation();

  return (
    <PrimaryButton
      {...args}
      title={t('screens.login.title')}
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
    />
  );
};

export const CO2Button: PrimaryButtonStory = (args) => {
  const { t } = useTranslation();

  return (
    <PrimaryButton
      {...args}
      title={t('screens.login.title')}
      iconOne={() => (
        <View style={{ height: 23, justifyContent: 'center' }}>
          <CO2 style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>} />
        </View>
      )}
      long
      uppercase={false}
    />
  );
};
