import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import { Logger } from '@clean-rn/logger';

import { FormSignupBirth, ISignupBirthFormData } from '@clean-rn/ui-mobile';

import { COUNTRIES_AVAILABLE } from '@clean-rn/user/domain';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const locales = getLocales();
const defaultCountry = locales[0]?.regionCode || undefined;

const FormSignupBirthMeta: ComponentMeta<typeof FormSignupBirth> = {
  title: 'Forms/FormSignupBirth',
  component: FormSignupBirth,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onFocus: { action: 'onFocus' },
    defaultCountry: {
      options: Object.keys(COUNTRIES_AVAILABLE) as string[],
      control: { type: 'select' }, // Automatically inferred when 'options' is defined
    },
  },
  args: {
    defaultCountry,
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default FormSignupBirthMeta;

type FormSignupBirthStory = ComponentStory<typeof FormSignupBirth>;

export const Dynamic: FormSignupBirthStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupBirthFormData>({
    defaultValues: {
      birthCountry: defaultCountry,
      nationality: defaultCountry,
      birthday: new Date('1980-01-01'),
    },
  });

  const onSubmit = useCallback((formData: ISignupBirthFormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return <FormSignupBirth {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
