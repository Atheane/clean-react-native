import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import { Logger } from '@clean-rn/ddd';

import { FormSignupStep4, ISignupStep4FormData } from '@clean-rn/ui-mobile';

import { COUNTRIES_AVAILABLE } from '@clean-rn/auth/domain';
import { WithStatus, ValidationStatus, WithScroll, WithExtraBottomSpace } from '../../wrappers';

const locales = getLocales();
const defaultCountry = locales[0]?.regionCode || undefined;

const FormSignupStep4Meta: ComponentMeta<typeof FormSignupStep4> = {
  title: 'Forms/FormSignupStep4',
  component: FormSignupStep4,
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
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithExtraBottomSpace, WithScroll],
};

export default FormSignupStep4Meta;

type FormSignupStep4Story = ComponentStory<typeof FormSignupStep4>;

export const Dynamic: FormSignupStep4Story = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupStep4FormData>({
    defaultValues: {
      birthCountry: defaultCountry,
      nationality: defaultCountry,
      birthday: new Date('1980-01-01'),
    },
  });

  const onSubmit = useCallback((formData: ISignupStep4FormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return <FormSignupStep4 {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
