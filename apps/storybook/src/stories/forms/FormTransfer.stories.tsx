import React from 'react';
import { useForm } from 'react-hook-form';

import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { FormTransfer, ITransferFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const FormTransferMeta: ComponentMeta<typeof FormTransfer> = {
  title: 'Forms/FormTransfer',
  component: FormTransfer,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default FormTransferMeta;

type FormTransferStory = ComponentStory<typeof FormTransfer>;

export const Basic: FormTransferStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITransferFormData>();
  return <FormTransfer {...args} control={control} errors={errors} onSubmit={handleSubmit(args.onSubmit)} />;
};
