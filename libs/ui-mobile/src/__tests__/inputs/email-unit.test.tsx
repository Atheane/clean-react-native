import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { EmailInput } from '../../components/inputs/email-input';
import { theme } from '../../theme';

describe('EmailInput - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <EmailInput
            onFocus={() => {
              return;
            }}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('filled - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <EmailInput
            filled
            onFocus={() => {
              return;
            }}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
