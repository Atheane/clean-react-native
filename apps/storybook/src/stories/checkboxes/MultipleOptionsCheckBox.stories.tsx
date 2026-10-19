import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { MultipleOptionsCheckBox } from '@clean-rn/ui-mobile';
import { useTranslation } from 'react-i18next';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const YesNoCheckBoxMeta: ComponentMeta<typeof MultipleOptionsCheckBox> = {
  title: 'Checkboxes/MultipleOptionsCheckBox',
  component: MultipleOptionsCheckBox,
  argTypes: {
    onChange: { action: 'onChange' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default YesNoCheckBoxMeta;

export const YesNo: ComponentStory<typeof MultipleOptionsCheckBox> = (args) => {
  const { t } = useTranslation();
  return (
    <MultipleOptionsCheckBox
      {...args}
      label={t('signup-address.usperson.label')}
      subtitle={t('signup-address.usperson.subtitle')}
      optionsTitle={[t('signup-address.usperson.yes'), t('signup-address.usperson.no')]}
      optionsValues={[t('signup-address.usperson.yes'), t('signup-address.usperson.no')]}
    />
  );
};
export const ThreeTileOptions: ComponentStory<typeof MultipleOptionsCheckBox> = (args) => {
  const { t } = useTranslation();

  return (
    <MultipleOptionsCheckBox
      {...args}
      label={t('signup-identity.gender.label')}
      optionsTitle={[
        t('signup-identity.gender.man'),
        t('signup-identity.gender.woman'),
        t('signup-identity.gender.neutral'),
      ]}
      optionsValues={[
        t('signup-identity.gender.man'),
        t('signup-identity.gender.woman'),
        t('signup-identity.gender.neutral'),
      ]}
    />
  );
};
