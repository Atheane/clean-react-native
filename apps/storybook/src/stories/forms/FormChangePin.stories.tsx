import { useForm } from 'react-hook-form';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { FormChangePin, IChangePinFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const FormChangePinMeta: ComponentMeta<typeof FormChangePin> = {
  title: 'Forms/FormChangePin',
  component: FormChangePin,
  argTypes: {
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
    formState: { errors },
  } = useForm<IChangePinFormData>();

  return <FormChangePin {...args} control={control} errors={errors} />;
};

export const WithText: FormChangePinStory = (args) => {
  const {
    control,
    formState: { errors },
  } = useForm<IChangePinFormData>();

  return <FormChangePin {...args} control={control} text={'textajkzdjkbaz jakzbelkjbaz'} errors={errors} />;
};
