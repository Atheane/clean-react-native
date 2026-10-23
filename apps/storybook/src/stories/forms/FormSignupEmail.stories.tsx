import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { FormSignupEmail, ISignupEmailFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const FormSignupEmailMeta: ComponentMeta<typeof FormSignupEmail> = {
  title: 'Forms/FormSignupEmail',
  component: FormSignupEmail,
  argTypes: {
    onFocus: { action: 'onFocus' },
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default FormSignupEmailMeta;

type FormSignupEmailStory = ComponentStory<typeof FormSignupEmail>;

export const Dynamic: FormSignupEmailStory = (args) => {
  const onSubmit = useCallback(() => {
    console.log('onFocus');
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupEmailFormData>();

  return <FormSignupEmail {...args} control={control} errors={errors} onFocus={handleSubmit(onSubmit)} />;
};
