import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { WebViewer } from '../../components/others/web-viewer';
import { theme } from '../../theme';

describe('WebViewer - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <WebViewer url="https://www.example.com/assets/docs/cgu.pdf" />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
