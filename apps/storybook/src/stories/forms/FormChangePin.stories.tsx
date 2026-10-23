import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Logger } from '@clean-rn/logger';
import { FormChangePin, IChangePinFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const FormChangePinMeta: ComponentMeta<typeof FormChangePin> = {
  title: 'Forms/FormChangePin',
  component: FormChangePin,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
    onFocus: { action: 'onFocus' },
  },
  args: {
    text: '',
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default FormChangePinMeta;

type FormChangePinStory = ComponentStory<typeof FormChangePin>;

export const Basic: FormChangePinStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePinFormData>();

  const onSubmit = useCallback((formData: IChangePinFormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return <FormChangePin {...args} control={control} errors={errors} onSubmit={handleSubmit(onSubmit)} />;
};

export const WithText: FormChangePinStory = (args) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePinFormData>();

  const onSubmit = useCallback((formData: IChangePinFormData) => {
    Logger.getInstance().debug(formData);
  }, []);

  return (
    <FormChangePin
      {...args}
      control={control}
      text={'textajkzdjkbaz jakzbelkjbaz'}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
