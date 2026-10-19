import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { TransportForm, useTransportFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

const TransportFormMeta: ComponentMeta<typeof TransportForm> = {
  title: 'Forms/TransportForm',
  component: TransportForm,
  argTypes: {
    onChangeForm: { action: 'onChangeForm' },
    onChangeField: { action: 'onChangeField' },
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default TransportFormMeta;

type TransportFormStory = ComponentStory<typeof TransportForm>;

export const Static: TransportFormStory = (args) => <TransportForm {...args} />;
export const Dynamic: TransportFormStory = () => {
  const { resetFormData, handleFormData } = useTransportFormData();
  return <TransportForm onChangeForm={resetFormData} onChangeField={handleFormData} />;
};
