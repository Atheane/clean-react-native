import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { FoodForm, useFoodFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const FoodFormMeta: ComponentMeta<typeof FoodForm> = {
  title: 'Forms/FoodForm',
  component: FoodForm,
  argTypes: {
    onChangeForm: { action: 'onChangeForm' },
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
};

export default FoodFormMeta;

type FoodFormStory = ComponentStory<typeof FoodForm>;

export const Dynamic: FoodFormStory = () => {
  const { handleFormData } = useFoodFormData(null);
  return <FoodForm initialValues={null} onChangeForm={handleFormData} />;
};
