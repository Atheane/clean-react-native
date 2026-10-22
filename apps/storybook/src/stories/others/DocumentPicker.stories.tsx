import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

import { DocumentPicker } from '@clean-rn/ui-mobile';

const DocumentPickerMeta: ComponentMeta<typeof DocumentPicker> = {
  title: 'Others/DocumentPicker',
  component: DocumentPicker,
  argTypes: {
    handleError: { action: 'handleError' },
    getDocument: { action: 'getDocument' },
    setLoading: { action: 'setLoading' },
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default DocumentPickerMeta;

export const Static: ComponentStory<typeof DocumentPicker> = (args) => <DocumentPicker {...args} />;
