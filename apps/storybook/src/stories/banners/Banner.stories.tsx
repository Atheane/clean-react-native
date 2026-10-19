import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { useTranslation } from 'react-i18next';

import { AccountError } from '@clean-rn/account/domain';
import { Banner, BannerColors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const BannerMeta: ComponentMeta<typeof Banner> = {
  title: 'Banners/Banner',
  component: Banner,
  argTypes: {
    onPressRightIcon: { action: 'onPressRightIcon' },
  },
  args: {
    colorBanner: BannerColors.PINK,
    rightIcon: true,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default BannerMeta;

type BannerStory = ComponentStory<typeof Banner>;

export const UpdateNeeded: BannerStory = (args) => {
  const { t } = useTranslation();
  return <Banner {...args} title={t('banners.update-application')} />;
};
export const ErrorMessage: BannerStory = (args) => {
  const error = new AccountError.InvalidIban('Invalid IBAN');
  return <Banner {...args} title={error.message} rightIcon={false} />;
};
export const IdentityValidation: BannerStory = (args) => {
  const { t } = useTranslation();
  return <Banner {...args} title={t('banners.identity-validation')} colorBanner={BannerColors.PURPLE} />;
};
