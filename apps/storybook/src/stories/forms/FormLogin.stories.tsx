import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { FormLogin, ILoginFormData, useTogglePress, useSecure } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';
import { Logger } from '@clean-rn/logger';

const FormLoginMeta: ComponentMeta<typeof FormLogin> = {
  title: 'Forms/FormLogin',
  component: FormLogin,
  argTypes: {
    onToggleSecurity: { action: 'onToggleSecurity' },
    onPress: { action: 'onPress' },
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    email: 'jean-luc.baradat@gmail.com',
    secured: true,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithKeyboardAwareScroll],
};

export default FormLoginMeta;

type FormLoginStory = ComponentStory<typeof FormLogin>;

export const Dynamic: FormLoginStory = (args) => {
  const { secured, onToggleSecurity } = useSecure(true);
  const { onPress } = useTogglePress(false);

  const onSubmit = useCallback(() => {
    Logger.getInstance().info('onSubmit');
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  return (
    <FormLogin
      {...args}
      control={control}
      errors={errors}
      secured={secured}
      onToggleSecurity={onToggleSecurity}
      onPress={onPress}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
