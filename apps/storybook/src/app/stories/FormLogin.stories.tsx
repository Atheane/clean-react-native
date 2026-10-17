import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { FormLogin, LoginFormData, useTogglePress, useEdit, useSecure } from '@clean-rn/ui-mobile';

import { WithSwitch, ValidationStatus, WithScroll } from '../wrappers';
import { Logger } from '@clean-rn/ddd';

const FormLoginMeta: ComponentMeta<typeof FormLogin> = {
  title: 'Validated/Auth/FormLogin',
  component: FormLogin,
  argTypes: {
    onEdit: { action: 'onEdit' },
    onToggleSecurity: { action: 'onToggleSecurity' },
    onPress: { action: 'onPress' },
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    email: 'jean-luc.baradat@gmail.com',
    filled: true,
    secured: true,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED), WithScroll],
};

export default FormLoginMeta;

type FormLoginStory = ComponentStory<typeof FormLogin>;

export const Dynamic: FormLoginStory = (args) => {
  const { filled, onEdit } = useEdit(true);
  const { secured, onToggleSecurity } = useSecure(true);
  const { onPress } = useTogglePress(false);

  const onSubmit = useCallback(() => {
    Logger.getInstance().info('onSubmit');
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  return (
    <FormLogin
      {...args}
      control={control}
      errors={errors}
      filled={filled}
      onEdit={onEdit}
      secured={secured}
      onToggleSecurity={onToggleSecurity}
      onPress={onPress}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
