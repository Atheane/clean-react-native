import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { PdfViewer } from '@clean-rn/ui-mobile';

const PdfViewerMeta: ComponentMeta<typeof PdfViewer> = {
  title: 'Others/PdfViewer',
  component: PdfViewer,
  args: {
    source: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
};

export default PdfViewerMeta;

export const Static: ComponentStory<typeof PdfViewer> = (args) => <PdfViewer {...args} />;
