import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import { Logger } from '@clean-rn/ddd';
import { COUNTRIES_AVAILABLE } from '@clean-rn/auth/domain';
import { FormSignupStep5, ISignupStep5FormData } from '@clean-rn/ui-mobile';
import { WithSwitch, ValidationStatus, WithKeyboardAwareScroll } from '../wrappers';

const locales = getLocales();
const defaultCountry = locales[0]?.regionCode || undefined;

const FormSignupStep5Meta: ComponentMeta<typeof FormSignupStep5> = {
  title: 'Forms/FormSignupStep5',
  component: FormSignupStep5,
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
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED), WithKeyboardAwareScroll],
};

export default FormSignupStep5Meta;

type FormSignupStep5Story = ComponentStory<typeof FormSignupStep5>;

export const Dynamic: FormSignupStep5Story = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupStep5FormData>({
    defaultValues: {
      country: defaultCountry,
    },
  });

  const onSubmit = useCallback((formData: ISignupStep5FormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return <FormSignupStep5 {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
