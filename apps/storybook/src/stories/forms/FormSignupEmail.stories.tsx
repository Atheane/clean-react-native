import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Logger } from '@clean-rn/logger';
import { FormSignupEmail, ISignupEmailFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll, WithExtraBottomSpace } from '../../wrappers';

const FormSignupEmailMeta: ComponentMeta<typeof FormSignupEmail> = {
  title: 'Forms/FormSignupEmail',
  component: FormSignupEmail,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  decorators: [
    (Story) => WithStatus(Story, ValidationStatus.VALIDATED),
    WithExtraBottomSpace,
    WithKeyboardAwareScroll,
  ],
};

export default FormSignupEmailMeta;

type FormSignupEmailStory = ComponentStory<typeof FormSignupEmail>;

export const Dynamic: FormSignupEmailStory = (args) => {
  const onSubmit = useCallback(() => {
    Logger.getInstance().info('onSubmit');
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupEmailFormData>();

  return <FormSignupEmail {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
