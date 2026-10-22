import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { FormContact, IContactFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';
import { Logger } from '@clean-rn/logger';

const FormContactMeta: ComponentMeta<typeof FormContact> = {
  title: 'Forms/FormContact',
  component: FormContact,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onFocus: { action: 'onFocus' },
  },
  args: {},
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default FormContactMeta;

type FormContactStory = ComponentStory<typeof FormContact>;

export const Dynamic: FormContactStory = (args) => {
  const onSubmit = useCallback(() => {
    Logger.getInstance().info('onSubmit');
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactFormData>();
  return <FormContact {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
