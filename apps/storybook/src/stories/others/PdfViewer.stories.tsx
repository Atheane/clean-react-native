import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { PdfViewer } from '@clean-rn/ui-mobile';

const PdfViewerMeta: ComponentMeta<typeof PdfViewer> = {
  title: 'Others/PdfViewer',
  component: PdfViewer,
  args: {
    uri: 'https://www.africau.edu/images/default/sample.pdf',
  },
};

export default PdfViewerMeta;

export const Basic: ComponentStory<typeof PdfViewer> = (args) => <PdfViewer {...args} />;
