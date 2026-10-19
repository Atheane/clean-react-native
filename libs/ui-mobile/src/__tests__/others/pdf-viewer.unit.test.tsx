import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { PdfViewer } from '../../components/others/pdf-viewer';
import { theme } from '../../theme';

describe('PdfViewer - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PdfViewer url="https://www.example.com/assets/docs/cgu.pdf" />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
