import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { UploadDocumentCard, KycW9, KycW9Disabled } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';
import { IDocumentStatus } from '@clean-rn/kyc/domain';

const UploadDocumentCardMeta: ComponentMeta<typeof UploadDocumentCard> = {
  title: 'Cards/UploadDocumentCard',
  component: UploadDocumentCard,
  argTypes: {
    onPress: { action: 'onPress' },
    onEdit: { action: 'onEdit' },
    status: {
      options: ['VALIDATED', 'PENDING', 'REFUSED'],
      control: { type: 'radio' },
    },
  },
  args: {
    text: 'Lorem ipsum delatus',
    icon: KycW9,
    iconDisabled: KycW9Disabled,
    disabled: true,
    status: IDocumentStatus.PENDING,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default UploadDocumentCardMeta;

type UploadDocumentCardStory = ComponentStory<typeof UploadDocumentCard>;

export const Basic: UploadDocumentCardStory = (args) => <UploadDocumentCard {...args} onEdit={undefined} />;
export const Refused: UploadDocumentCardStory = (args) => <UploadDocumentCard {...args} status="REFUSED" />;
