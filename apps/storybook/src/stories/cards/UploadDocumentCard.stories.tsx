import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { UploadDocumentCard, KycW9 } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';
import { IDocumentStatus } from '@clean-rn/kyc/domain';

const UploadDocumentCardMeta: ComponentMeta<typeof UploadDocumentCard> = {
  title: 'Cards/UploadDocumentCard',
  component: UploadDocumentCard,
  argTypes: {
    onPress: { action: 'onPress' },
    onEdit: { action: 'onEdit' },
    onCancel: { action: 'onCancel' },
    status: {
      options: ['VALIDATED', 'PENDING', 'REFUSED'],
      control: { type: 'radio' },
    },
  },
  args: {
    icon: KycW9,
    text: 'Lorem ipsum delatus',
    status: IDocumentStatus.PENDING,
    loading: false,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default UploadDocumentCardMeta;

type UploadDocumentCardStory = ComponentStory<typeof UploadDocumentCard>;

export const Basic: UploadDocumentCardStory = (args) => <UploadDocumentCard {...args} onEdit={undefined} />;
export const Refused: UploadDocumentCardStory = (args) => <UploadDocumentCard {...args} status="REFUSED" />;
export const Loading: UploadDocumentCardStory = (args) => (
  <UploadDocumentCard {...args} status={undefined} loading onEdit={undefined} />
);
