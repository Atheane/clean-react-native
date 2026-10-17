import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Logger } from '@clean-rn/ddd';
import { FormSignupStep3, SignupStep3FormData } from '@clean-rn/ui-mobile';
import { WithSwitch, ValidationStatus, WithKeyboardAwareScroll } from '../wrappers';

const FormSignupStep3Meta: ComponentMeta<typeof FormSignupStep3> = {
  title: 'Validated/Auth/FormSignupStep3',
  component: FormSignupStep3,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  args: {},
  decorators: [(Story) => WithSwitch(Story, ValidationStatus.VALIDATED), WithKeyboardAwareScroll],
};

export default FormSignupStep3Meta;

type FormSignupStep3Story = ComponentStory<typeof FormSignupStep3>;

export const Dynamic: FormSignupStep3Story = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupStep3FormData>();

  const onSubmit = useCallback((formData: SignupStep3FormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return <FormSignupStep3 {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};
