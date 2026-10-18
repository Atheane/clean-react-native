import { ComponentStory, ComponentMeta } from '@storybook/react-native';

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
    title: 'Mise à jour à faire',
    colorBanner: BannerColors.PINK,
    rightIcon: true,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default BannerMeta;

type BannerStory = ComponentStory<typeof Banner>;

export const UpdateNeeded: BannerStory = (args) => <Banner {...args} />;
export const ErrorMessage: BannerStory = (args) => {
  const error = new AccountError.InvalidIban('Invalid IBAN');
  return <Banner {...args} title={error.message} rightIcon={false} />;
};
export const IdentityValidation: BannerStory = (args) => {
  return <Banner {...args} title="Validation d'identité" colorBanner={BannerColors.PURPLE} />;
};
