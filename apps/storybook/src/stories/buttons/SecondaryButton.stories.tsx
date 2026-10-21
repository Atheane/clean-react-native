import { StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

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
    long: false,
    uppercase: true,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default SecondaryButtonMeta;

type SecondaryButtonStory = ComponentStory<typeof SecondaryButton>;

export const Short: SecondaryButtonStory = (args) => {
  const { t } = useTranslation();
  return <SecondaryButton {...args} title={t('screens.login.title')} />;
};
export const Long: SecondaryButtonStory = (args) => {
  const { t } = useTranslation();
  return <SecondaryButton {...args} title={t('screens.login.title')} long />;
};

export const Icon: SecondaryButtonStory = (args) => {
  const { t } = useTranslation();

  return (
    <SecondaryButton
      {...args}
      iconOne={() => (
        <Logout
          width={27}
          height={27}
          style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
        />
      )}
      title={t('screens.login.title')}
    />
  );
};

export const LongText: SecondaryButtonStory = (args) => {
  return (
    <SecondaryButton
      {...args}
      title={'Importer un document'}
      uppercase={false}
      long
      iconOne={() => (
        <Logout
          width={27}
          height={27}
          style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
        />
      )}
    />
  );
};
