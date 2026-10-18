import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import { Logger } from '@clean-rn/logger';
import { COUNTRIES_AVAILABLE } from '@clean-rn/auth/domain';
import { FormSignupAddress, ISignupAddressFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll, WithExtraBottomSpace } from '../../wrappers';

const locales = getLocales();
const defaultCountry = locales[0]?.regionCode || undefined;

const FormSignupAddressMeta: ComponentMeta<typeof FormSignupAddress> = {
  title: 'Forms/FormSignupAddress',
  component: FormSignupAddress,
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
  decorators: [
    (Story) => WithStatus(Story, ValidationStatus.VALIDATED),
    WithExtraBottomSpace,
    WithKeyboardAwareScroll,
  ],
};

export default FormSignupAddressMeta;

type FormSignupAddressStory = ComponentStory<typeof FormSignupAddress>;

export const Dynamic: FormSignupAddressStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupAddressFormData>({
    defaultValues: {
      country: defaultCountry,
    },
  });

  const onSubmit = useCallback((formData: ISignupAddressFormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return <FormSignupAddress {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
