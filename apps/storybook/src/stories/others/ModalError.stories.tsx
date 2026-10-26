import type { Meta, StoryObj } from '@storybook/react';
import { ModalError } from '@clean-rn/ui-mobile';
import { ServerError } from '@clean-rn/shared/infrastructure';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Others/ModalError',
  component: ModalError,
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
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
  },
};
