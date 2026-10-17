import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { PdfViewer } from '@clean-rn/ui-mobile';

const PdfViewerMeta: ComponentMeta<typeof PdfViewer> = {
  title: 'Validated/Shared/PdfViewer',
  component: PdfViewer,
  args: {
    url: 'https://www.example.com/assets/docs/cgu.pdf',
  },
};

export default PdfViewerMeta;

export const Static: ComponentStory<typeof PdfViewer> = (args) => <PdfViewer {...args} />;
