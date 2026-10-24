import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import { FormSignupAddress, ISignupAddressFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus } from '../../wrappers';

const locales = getLocales();
const language = locales[0]?.regionCode || undefined;

const FormSignupAddressMeta: ComponentMeta<typeof FormSignupAddress> = {
  title: 'Forms/FormSignupAddress',
  component: FormSignupAddress,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onFocus: { action: 'onFocus' },
  },
  args: {
    language,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default FormSignupAddressMeta;

type FormSignupAddressStory = ComponentStory<typeof FormSignupAddress>;

export const Dynamic: FormSignupAddressStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupAddressFormData>();

  const onSubmit = useCallback((formData: ISignupAddressFormData) => {
    console.log(formData);
  }, []);

  return <FormSignupAddress {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
