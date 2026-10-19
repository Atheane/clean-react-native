import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { ModalError } from '@clean-rn/ui-mobile';
import { ServerError } from '@clean-rn/shared/infrastructure';

const ModalErrorMeta: ComponentMeta<typeof ModalError> = {
  title: 'Others/ModalError',
  component: ModalError,
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

export default ModalErrorMeta;

export const Static: ComponentStory<typeof ModalError> = (args) => <ModalError {...args} />;
