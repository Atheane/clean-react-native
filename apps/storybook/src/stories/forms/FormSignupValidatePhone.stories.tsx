import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Logger } from '@clean-rn/logger';
import { FormSignupValidatePhone, ISignupValidatePhoneFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const FormSignupValidatePhoneMeta: ComponentMeta<typeof FormSignupValidatePhone> = {
  title: 'Forms/FormSignupValidatePhone',
  component: FormSignupValidatePhone,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  args: {},
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default FormSignupValidatePhoneMeta;

type FormSignupValidatePhoneStory = ComponentStory<typeof FormSignupValidatePhone>;

export const Dynamic: FormSignupValidatePhoneStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupValidatePhoneFormData>();

  const onSubmit = useCallback((formData: ISignupValidatePhoneFormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return (
    <FormSignupValidatePhone {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />
  );
};
