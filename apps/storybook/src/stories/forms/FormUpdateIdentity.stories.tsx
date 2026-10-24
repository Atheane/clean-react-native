import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import dayjs from 'dayjs';
import { FormUpdateIdentity, IUpdateIdentityFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const locales = getLocales();
const defaultCountry = locales[0]?.regionCode || undefined;

const FormUpdateIdentityMeta: ComponentMeta<typeof FormUpdateIdentity> = {
  title: 'Forms/FormUpdateIdentity',
  component: FormUpdateIdentity,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onFocus: { action: 'onFocus' },
    onToggleSecurityPassword: { action: 'onToggleSecurityPassword' },
  },
  args: {
    defaultCountry,
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default FormUpdateIdentityMeta;

type FormUpdateIdentityStory = ComponentStory<typeof FormUpdateIdentity>;

export const Dynamic: FormUpdateIdentityStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateIdentityFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      birthday: dayjs('1980-01-01'),
      birthCountry: defaultCountry,
      nationality: defaultCountry,
    },
  });

  const onSubmit = useCallback((formData: IUpdateIdentityFormData) => {
    console.log(formData);
  }, []);

  return <FormUpdateIdentity {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
