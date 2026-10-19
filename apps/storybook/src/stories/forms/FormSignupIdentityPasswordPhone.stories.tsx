import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { getLocales } from 'expo-localization';

import { Logger } from '@clean-rn/logger';
import { IGender } from '@clean-rn/auth/domain';
import {
  FormSignupIdentityPasswordPhone,
  ISignupIdentityPasswordPhoneFormData,
  useSecure,
} from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll, WithExtraBottomSpace } from '../../wrappers';

const locales = getLocales();
const defaultCountry = locales[0]?.regionCode || undefined;

const FormSignupIdentityPasswordPhoneMeta: ComponentMeta<typeof FormSignupIdentityPasswordPhone> = {
  title: 'Forms/FormSignupIdentityPasswordPhone',
  component: FormSignupIdentityPasswordPhone,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onFocus: { action: 'onFocus' },
    onToggleSecurityPassword: { action: 'onToggleSecurityPassword' },
  },
  args: {
    defaultCountry,
    securedPassword: true,
  },
  decorators: [
    (Story) => WithStatus(Story, ValidationStatus.VALIDATED),
    WithExtraBottomSpace,
    WithKeyboardAwareScroll,
  ],
};

export default FormSignupIdentityPasswordPhoneMeta;

type FormSignupIdentityPasswordPhoneStory = ComponentStory<typeof FormSignupIdentityPasswordPhone>;

export const Dynamic: FormSignupIdentityPasswordPhoneStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupIdentityPasswordPhoneFormData>({
    defaultValues: {
      title: IGender.MAN,
      firstName: '',
      lastName: '',
      countryCode: defaultCountry,
      phone: undefined,
    },
  });

  const { secured: securedPassword, onToggleSecurity: onToggleSecurityPassword } = useSecure(true);

  const onSubmit = useCallback((formData: ISignupIdentityPasswordPhoneFormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return (
    <FormSignupIdentityPasswordPhone
      {...args}
      control={control}
      errors={errors}
      securedPassword={securedPassword}
      onToggleSecurityPassword={onToggleSecurityPassword}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
