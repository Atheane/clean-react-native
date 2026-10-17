import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { FoodForm, useFoodFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithScroll, WithCenterView } from '../wrappers';

const FoodFormMeta: ComponentMeta<typeof FoodForm> = {
  title: 'Forms/FoodForm',
  component: FoodForm,
  argTypes: {
    onChangeForm: { action: 'onChangeForm' },
  },
  decorators: [WithScroll, (Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default FoodFormMeta;

type FoodFormStory = ComponentStory<typeof FoodForm>;

export const Static: FoodFormStory = (args) => <FoodForm {...args} />;
export const Dynamic: FoodFormStory = () => {
  const { handleFormData } = useFoodFormData(null);
  return <FoodForm initialValues={null} onChangeForm={handleFormData} />;
};
