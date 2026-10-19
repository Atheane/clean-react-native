import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

import { DocumentScanner } from '@clean-rn/ui-mobile';

const DocumentScannerMeta: ComponentMeta<typeof DocumentScanner> = {
  title: 'Others/DocumentScanner',
  component: DocumentScanner,
  // decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.PENDING)],
};

export default DocumentScannerMeta;

export const Static: ComponentStory<typeof DocumentScanner> = () => <DocumentScanner />;
