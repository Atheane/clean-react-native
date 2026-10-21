import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { PdfDownloader, Edit } from '@clean-rn/ui-mobile';

const PdfDownloaderMeta: ComponentMeta<typeof PdfDownloader> = {
  title: 'Others/PdfDownloader',
  component: PdfDownloader,
  argTypes: {
    handleError: {
      action: 'handleError',
    },
  },
  args: {
    uri: 'https://www.africau.edu/images/default/sample.pdf',
    fileName: 'sample-test.pdf',
    icon: () => <Edit />,
  },
};

export default PdfDownloaderMeta;

export const Basic: ComponentStory<typeof PdfDownloader> = (args) => <PdfDownloader {...args} />;
