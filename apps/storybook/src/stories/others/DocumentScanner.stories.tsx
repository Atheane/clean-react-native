import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

import { DocumentScanner } from '@clean-rn/ui-mobile';

const DocumentScannerMeta: ComponentMeta<typeof DocumentScanner> = {
  title: 'Others/DocumentScanner',
  component: DocumentScanner,
  argTypes: {
    handleError: { action: 'handleError' },
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default DocumentScannerMeta;

export const Static: ComponentStory<typeof DocumentScanner> = (args) => <DocumentScanner {...args} />;
