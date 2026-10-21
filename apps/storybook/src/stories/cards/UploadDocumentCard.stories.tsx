import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { UploadDocumentCard, KycW9 } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';
import { IDocumentStatus } from '@clean-rn/kyc/domain';

const UploadDocumentCardMeta: ComponentMeta<typeof UploadDocumentCard> = {
  title: 'Cards/UploadDocumentCard',
  component: UploadDocumentCard,
  argTypes: {
    onPress: { action: 'onPress' },
    onCancel: { action: 'onCancel' },
  },
  args: {
    icon: KycW9,
    text: 'Lorem ipsum delatus Lorem ipsum delatus',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default UploadDocumentCardMeta;

type UploadDocumentCardStory = ComponentStory<typeof UploadDocumentCard>;

export const Pending: UploadDocumentCardStory = (args) => {
  return <UploadDocumentCard {...args} status={IDocumentStatus.PENDING} loading={false} />;
};

export const Validated: UploadDocumentCardStory = (args) => {
  return <UploadDocumentCard {...args} status={IDocumentStatus.VALIDATED} loading={false} />;
};

export const Refused: UploadDocumentCardStory = (args) => (
  <UploadDocumentCard
    {...args}
    status={IDocumentStatus.REFUSED}
    loading={false}
    errorMessage={'Message d’erreur correspondant au STATUS_CODE du document envoyé par KycProvider'}
  />
);
export const Loading: UploadDocumentCardStory = (args) => (
  <UploadDocumentCard {...args} status={undefined} loading />
);
