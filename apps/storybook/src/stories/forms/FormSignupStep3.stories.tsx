import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Logger } from '@clean-rn/logger';
import { FormSignupStep3, ISignupStep3FormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll, WithExtraBottomSpace } from '../../wrappers';

const FormSignupStep3Meta: ComponentMeta<typeof FormSignupStep3> = {
  title: 'Forms/FormSignupStep3',
  component: FormSignupStep3,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  args: {},
  decorators: [
    (Story) => WithStatus(Story, ValidationStatus.VALIDATED),
    WithExtraBottomSpace,
    WithKeyboardAwareScroll,
  ],
};

export default FormSignupStep3Meta;

type FormSignupStep3Story = ComponentStory<typeof FormSignupStep3>;

export const Dynamic: FormSignupStep3Story = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupStep3FormData>();

  const onSubmit = useCallback((formData: ISignupStep3FormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return <FormSignupStep3 {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
