import type { Meta, StoryObj } from '@storybook/react';
import { ModalError } from '../../src/components/modals/modal-error';
import { ServerError } from '@clean-rn/shared/infrastructure';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Modals/ModalError',
  component: ModalError,
  decorators: [WithCenterView],
} as Meta<typeof ModalError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    error: new ServerError({
      message: 'test',
      statusCode: 400,
      response: {
        statusCode: 400,
        message: ['inner server error content'],
        error: 'inner server error',
      },
    }),
    errorCode: 'Error code',
    errorDetails: 'Error details',
    errorStack: 'Error stack',
    genericMessage: 'Generic message',
  },
};
