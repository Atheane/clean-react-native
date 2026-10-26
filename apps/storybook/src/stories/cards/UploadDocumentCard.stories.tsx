import type { Meta, StoryObj } from '@storybook/react';

import { UploadDocumentCard, KycW9 } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';
import { IDocumentStatus } from '@clean-rn/kyc/domain';

const meta = {
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
  decorators: [(Story: any) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} satisfies Meta<typeof UploadDocumentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    icon: KycW9,
    text: 'Lorem ipsum delatus Lorem ipsum delatus',
    status: IDocumentStatus.PENDING,
    loading: false,
  },
};

export const Validated: Story = {
  args: {
    icon: KycW9,
    text: 'Lorem ipsum delatus Lorem ipsum delatus',
    status: IDocumentStatus.VALIDATED,
    loading: false,
  },
};

export const Refused: Story = {
  args: {
    icon: KycW9,
    text: 'Lorem ipsum delatus Lorem ipsum delatus',
    status: IDocumentStatus.REFUSED,
    loading: false,
    errorMessage: 'Message d’erreur correspondant au STATUS_CODE du document envoyé par KycProvider',
  },
};

export const Loading: Story = {
  args: {
    icon: KycW9,
    text: 'Lorem ipsum delatus Lorem ipsum delatus',
    status: undefined,
    loading: true,
  },
};
