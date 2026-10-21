import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { WebViewer } from '@clean-rn/ui-mobile';

const WebViewerMeta: ComponentMeta<typeof WebViewer> = {
  title: 'Others/WebViewer',
  component: WebViewer,
  args: {
    uri: 'https://example.com/green-euro-intro',
  },
};

export default WebViewerMeta;

export const Static: ComponentStory<typeof WebViewer> = (args) => <WebViewer {...args} />;
