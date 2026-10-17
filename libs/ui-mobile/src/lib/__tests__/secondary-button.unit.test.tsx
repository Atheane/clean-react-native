import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { Love } from '../assets';
import { SecondaryButton } from '../components/secondary-button';
import { theme } from '../theme';

describe('PrimaryButton - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SecondaryButton title="test-title" onPress={() => console.log('pressed')} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('fixedSize - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SecondaryButton title="test-title" onPress={() => console.log('pressed')} fixedSize />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('uppercase - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SecondaryButton title="test-title" onPress={() => console.log('pressed')} uppercase />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('iconOne - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SecondaryButton title="test-title" onPress={() => console.log('pressed')} iconOne={Love} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
