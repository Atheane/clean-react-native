import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import { Logger } from '@clean-rn/ddd';
import { IGender } from '@clean-rn/auth/domain';
import { FormSignupStep2, SignupStep2FormData } from '@clean-rn/ui-mobile';
import { WithSwitch, ValidationStatus, WithKeyboardAwareScroll } from '../wrappers';

const locales = getLocales();
const defaultCountry = locales[0]?.regionCode || undefined;

const FormSignupStep2Meta: ComponentMeta<typeof FormSignupStep2> = {
  title: 'Validated/Auth/FormSignupStep2',
  component: FormSignupStep2,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onFocus: { action: 'onFocus' },
  },
  args: {
    defaultCountry,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED), WithKeyboardAwareScroll],
};

export default FormSignupStep2Meta;

type FormSignupStep2Story = ComponentStory<typeof FormSignupStep2>;

export const Dynamic: FormSignupStep2Story = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupStep2FormData>({
    defaultValues: {
      title: IGender.MAN,
      firstName: '',
      lastName: '',
      countryCode: defaultCountry,
      phone: undefined,
    },
  });

  const onSubmit = useCallback((formData: SignupStep2FormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return <FormSignupStep2 {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
