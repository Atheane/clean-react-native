import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { useTranslation } from 'react-i18next';

import { Logger } from '@clean-rn/ddd';
import { AuthError } from '@clean-rn/auth/domain';
import {
  FormSignupStep1,
  SignupStep1FormData,
  useSecure,
  firstLetterCapitalize,
} from '@clean-rn/ui-mobile';
import { WithSwitch, ValidationStatus, WithKeyboardAwareScroll } from '../wrappers';

const FormSignupStep1Meta: ComponentMeta<typeof FormSignupStep1> = {
  title: 'Validated/Auth/FormSignupStep1',
  component: FormSignupStep1,
  argTypes: {
    onToggleSecurityPassword: { action: 'onToggleSecurityPassword' },
    onToggleSecurityConfirmPassword: { action: 'onToggleSecurityConfirmPassword' },
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    securedPassword: true,
    securedConfirmPassword: true,
  },
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED), WithKeyboardAwareScroll],
};

export default FormSignupStep1Meta;

type FormSignupStep1Story = ComponentStory<typeof FormSignupStep1>;

export const Dynamic: FormSignupStep1Story = (args) => {
  const { secured: securedPassword, onToggleSecurity: onToggleSecurityPassword } = useSecure(true);
  const { secured: securedConfirmPassword, onToggleSecurity: onToggleSecurityConfirmPassword } =
    useSecure(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupStep1FormData>();

  const [errorPasswordMismatch, setErrorPasswordMismatch] = useState<AuthError.InvalidPassword | null>(null);

  const { t } = useTranslation();

  const onSubmit = useCallback(
    (formData: SignupStep1FormData) => {
      if (formData.password !== formData.confirmPassword) {
        setErrorPasswordMismatch(
          new AuthError.InvalidPassword({
            cause: firstLetterCapitalize(t('screens.signupstep1.error.auth')),
          }),
        );
        return;
      } else {
        setErrorPasswordMismatch(null);
      }
      Logger.getInstance().debug(formData);
    },
    [t],
  );

  return (
    <FormSignupStep1
      {...args}
      control={control}
      errors={errors}
      securedPassword={securedPassword}
      onToggleSecurityPassword={onToggleSecurityPassword}
      onToggleSecurityConfirmPassword={onToggleSecurityConfirmPassword}
      securedConfirmPassword={securedConfirmPassword}
      onSubmit={handleSubmit(onSubmit)}
      error={errorPasswordMismatch}
    />
  );
};
