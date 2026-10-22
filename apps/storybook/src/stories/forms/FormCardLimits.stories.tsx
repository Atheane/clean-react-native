import React from 'react';
import { useForm } from 'react-hook-form';

import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { FormCardLimits, ICardLimitsFormData } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const FormCardLimitsMeta: ComponentMeta<typeof FormCardLimits> = {
  title: 'Forms/FormCardLimits',
  component: FormCardLimits,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onFocus: { action: 'onFocus' },
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default FormCardLimitsMeta;

type FormCardLimitsStory = ComponentStory<typeof FormCardLimits>;

export const Basic: FormCardLimitsStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICardLimitsFormData>();
  return (
    <FormCardLimits {...args} control={control} errors={errors} onSubmit={handleSubmit(args.onSubmit)} />
  );
};
