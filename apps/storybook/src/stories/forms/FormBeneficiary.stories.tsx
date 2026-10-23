import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { FormBeneficiary, IBeneficiaryFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const FormBeneficiaryMeta: ComponentMeta<typeof FormBeneficiary> = {
  title: 'Forms/FormBeneficiary',
  component: FormBeneficiary,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  args: {},
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default FormBeneficiaryMeta;

type FormBeneficiaryStory = ComponentStory<typeof FormBeneficiary>;

export const Dynamic: FormBeneficiaryStory = (args) => {
  const onSubmit = useCallback(() => {
    console.log('onSubmit');
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBeneficiaryFormData>();
  return <FormBeneficiary {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
