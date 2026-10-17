import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Logger } from '@clean-rn/ddd';
import { FormResetPassword, ResetPasswordFormData, useEdit } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus, WithScroll } from '../wrappers';

const FormResetPasswordMeta: ComponentMeta<typeof FormResetPassword> = {
  title: 'Validated/Auth/FormResetPassword',
  component: FormResetPassword,
  argTypes: {
    onEdit: { action: 'onEdit' },
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    email: 'jean-luc.baradat@gmail.com',
    filled: true,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED), WithScroll],
};

export default FormResetPasswordMeta;

type FormResetpasswordStory = ComponentStory<typeof FormResetPassword>;

export const Dynamic: FormResetpasswordStory = (args) => {
  const { filled, onEdit } = useEdit(true);

  const onSubmit = useCallback(() => {
    Logger.getInstance().info('onSubmit');
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  return (
    <FormResetPassword
      {...args}
      control={control}
      errors={errors}
      filled={filled}
      onEdit={onEdit}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
