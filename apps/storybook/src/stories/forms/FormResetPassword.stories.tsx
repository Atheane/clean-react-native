import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Logger } from '@clean-rn/logger';
import { FormResetPassword, IResetPasswordFormData } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithKeyboardAwareScroll, WithExtraBottomSpace } from '../../wrappers';

const FormResetPasswordMeta: ComponentMeta<typeof FormResetPassword> = {
  title: 'Forms/FormResetPassword',
  component: FormResetPassword,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    email: 'jean-luc.baradat@gmail.com',
  },
  decorators: [
    (Story) => WithStatus(Story, ValidationStatus.VALIDATED),
    WithExtraBottomSpace,
    WithKeyboardAwareScroll,
  ],
};

export default FormResetPasswordMeta;

type FormResetpasswordStory = ComponentStory<typeof FormResetPassword>;

export const Dynamic: FormResetpasswordStory = (args) => {
  const onSubmit = useCallback(() => {
    Logger.getInstance().info('onSubmit');
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPasswordFormData>();

  return <FormResetPassword {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
