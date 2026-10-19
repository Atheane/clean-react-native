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
      label={t('screens.signupstep5.usperson.label')}
      subtitle={t('screens.signupstep5.usperson.subtitle')}
      optionsTitle={[t('screens.signupstep5.usperson.yes'), t('screens.signupstep5.usperson.no')]}
      optionsValues={[t('screens.signupstep5.usperson.yes'), t('screens.signupstep5.usperson.no')]}
    />
  );
};
export const ThreeTileOptions: ComponentStory<typeof MultipleOptionsCheckBox> = (args) => {
  const { t } = useTranslation();

  return (
    <MultipleOptionsCheckBox
      {...args}
      label={t('screens.signupstep2.gender.label')}
      optionsTitle={[
        t('screens.signupstep2.gender.man'),
        t('screens.signupstep2.gender.woman'),
        t('screens.signupstep2.gender.neutral'),
      ]}
      optionsValues={[
        t('screens.signupstep2.gender.man'),
        t('screens.signupstep2.gender.woman'),
        t('screens.signupstep2.gender.neutral'),
      ]}
    />
  );
};
