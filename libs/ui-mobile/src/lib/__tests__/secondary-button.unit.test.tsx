import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { LoveWhite } from '../assets';
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
  describe('large - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SecondaryButton title="test-title" onPress={() => console.log('pressed')} large />
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
          <SecondaryButton title="test-title" onPress={() => console.log('pressed')} iconOne={LoveWhite} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
