import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { HouseForm, useHouseFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const HouseFormMeta: ComponentMeta<typeof HouseForm> = {
  title: 'Forms/HouseForm',
  component: HouseForm,
  argTypes: {
    onChangeForm: { action: 'onChangeForm' },
    onChangeField: { action: 'onChangeField' },
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default HouseFormMeta;

type HouseFormStory = ComponentStory<typeof HouseForm>;

export const Static: HouseFormStory = (args) => <HouseForm {...args} />;
export const Dynamic: HouseFormStory = () => {
  const { resetFormData, handleFormData } = useHouseFormData();
  return <HouseForm onChangeForm={resetFormData} onChangeField={handleFormData} />;
};
