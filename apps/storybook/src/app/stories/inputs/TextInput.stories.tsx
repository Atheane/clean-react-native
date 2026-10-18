import { StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { TextInput, Love, Colors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const TextInputMeta: ComponentMeta<typeof TextInput> = {
  title: 'Inputs/TextInput',
  component: TextInput,
  argTypes: {
    onChange: {
      action: 'onChange',
    },
    onBlur: {
      action: 'onBlur',
    },
    onFocus: {
      action: 'onFocus',
    },
  },
  args: {
    label: 'Firstname',
    lowerCase: false,
    icon: () => (
      <Love
        width={27}
        height={27}
        style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    ),
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default TextInputMeta;

type TextInputStory = ComponentStory<typeof TextInput>;

export const TextPinkLabel: TextInputStory = (args) => {
  const { t } = useTranslation();

  return <TextInput {...args} label={t('screens.signupstep2.firstName.label')} />;
};
export const TextGreyLabel: TextInputStory = (args) => {
  const { t } = useTranslation();

  return (
    <TextInput
      {...args}
      label={t('screens.signupstep2.firstName.label')}
      labelColor={Colors.bank.primary.grey}
    />
  );
};

export const NumericPinkLabel: TextInputStory = (args) => {
  const { t } = useTranslation();

  return <TextInput {...args} label={t('screens.signupstep5.zip.label')} numeric />;
};
