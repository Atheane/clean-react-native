import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import { Logger } from '@clean-rn/ddd';
import { IGender } from '@clean-rn/auth/domain';
import { FormSignupStep2, ISignupStep2FormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const locales = getLocales();
const defaultCountry = locales[0]?.regionCode || undefined;

const FormSignupStep2Meta: ComponentMeta<typeof FormSignupStep2> = {
  title: 'Forms/FormSignupStep2',
  component: FormSignupStep2,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onFocus: { action: 'onFocus' },
  },
  args: {
    defaultCountry,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithKeyboardAwareScroll],
};

export default FormSignupStep2Meta;

type FormSignupStep2Story = ComponentStory<typeof FormSignupStep2>;

export const Dynamic: FormSignupStep2Story = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupStep2FormData>({
    defaultValues: {
      title: IGender.MAN,
      firstName: '',
      lastName: '',
      countryCode: defaultCountry,
      phone: undefined,
    },
  });

  const onSubmit = useCallback((formData: ISignupStep2FormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return <FormSignupStep2 {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
