import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { UploadDocumentCard } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';
import { W9, W9Disabled } from '../../../assets/images';

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
    image: W9,
    imageDisabled: W9Disabled,
    disabled: true,
    status: 'PENDING',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default UploadDocumentCardMeta;

type UploadDocumentCardStory = ComponentStory<typeof UploadDocumentCard>;

export const Basic: UploadDocumentCardStory = (args) => <UploadDocumentCard {...args} onEdit={undefined} />;
export const Refused: UploadDocumentCardStory = (args) => <UploadDocumentCard {...args} status="REFUSED" />;
