import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { UploadDocumentCard } from '../../src/components/cards/upload-document-card';
import { KycW9 } from '../../src/assets';

enum IDocumentStatus {
  INIT = 'INIT', // document template is created, but is not uploaded yet for review
  CANCELED = 'CANCELED', // document is canceled before analysis
  PENDING = 'PENDING', // document has pending status
  VALIDATED = 'VALIDATED', // document is validated
  REFUSED = 'REFUSED', // document is refused
}

const meta = {
  title: 'Cards/UploadDocumentCard',
  component: UploadDocumentCard,
  argTypes: {
    onPress: { action: 'onPress' },
    onCancel: { action: 'onCancel' },
  },
} satisfies Meta<typeof UploadDocumentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    icon: () => <KycW9 />,
    text: 'Lorem ipsum delatus Lorem ipsum delatus',
    status: IDocumentStatus.PENDING,
    loading: false,
  },
};

export const Validated: Story = {
  args: {
    icon: () => <KycW9 />,
    text: 'Lorem ipsum delatus Lorem ipsum delatus',
    status: IDocumentStatus.VALIDATED,
    loading: false,
  },
};

export const Refused: Story = {
  args: {
    icon: () => <KycW9 />,
    text: 'Lorem ipsum delatus Lorem ipsum delatus',
    status: IDocumentStatus.REFUSED,
    loading: false,
    errorMessage: 'Message d’erreur correspondant au STATUS_CODE du document envoyé par KycProvider',
  },
};

export const Loading: Story = {
  args: {
    icon: () => <KycW9 />,
    text: 'Lorem ipsum delatus Lorem ipsum delatus',
    status: undefined,
    loading: true,
  },
};
