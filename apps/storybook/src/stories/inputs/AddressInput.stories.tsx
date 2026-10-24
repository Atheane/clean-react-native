import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { AddressInput } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const AddressInputMeta: ComponentMeta<typeof AddressInput> = {
  title: 'Inputs/AddressInput',
  component: AddressInput,
  argTypes: {
    onAddressSelect: { action: 'onAddressSelect' },
    setDisabled: { action: 'setDisabled' },
  },
  args: {
    placeholder: 'Placeholder',
    language: 'fr',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default AddressInputMeta;

type AddressInputStory = ComponentStory<typeof AddressInput>;

export const Static: AddressInputStory = (args) => {
  return <AddressInput {...args} />;
};
