import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import { FormSignupPhone, ISignupPhoneFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const locales = getLocales();
const defaultCountry = locales[0]?.regionCode || undefined;

const FormSignupPhoneMeta: ComponentMeta<typeof FormSignupPhone> = {
  title: 'Forms/FormSignupPhone',
  component: FormSignupPhone,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onFocus: { action: 'onFocus' },
  },
  args: {
    defaultCountry,
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default FormSignupPhoneMeta;

type FormSignupPhoneStory = ComponentStory<typeof FormSignupPhone>;

export const Dynamic: FormSignupPhoneStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupPhoneFormData>({
    defaultValues: {
      countryCode: defaultCountry,
      phone: undefined,
    },
  });

  const onSubmit = useCallback((formData: ISignupPhoneFormData) => {
    console.log(formData);
  }, []);

  return <FormSignupPhone {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
