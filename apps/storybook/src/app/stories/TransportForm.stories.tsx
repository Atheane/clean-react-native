import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { TransportForm, useTransportFormData } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../wrappers';

const TransportFormMeta: ComponentMeta<typeof TransportForm> = {
  title: 'Forms/TransportForm',
  component: TransportForm,
  argTypes: {
    onChangeForm: { action: 'onChangeForm' },
    onChangeField: { action: 'onChangeField' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default TransportFormMeta;

type TransportFormStory = ComponentStory<typeof TransportForm>;

export const Static: TransportFormStory = (args) => <TransportForm {...args} />;
export const Dynamic: TransportFormStory = () => {
  const { resetFormData, handleFormData } = useTransportFormData();
  return <TransportForm onChangeForm={resetFormData} onChangeField={handleFormData} />;
};
