import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { LoveWhite } from '../assets';
import { PrimaryButton } from '../components/primary-button';
import { theme } from '../theme';

describe('PrimaryButton - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton title="test-title" onPress={() => console.log('pressed')} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('large - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton title="test-title" onPress={() => console.log('pressed')} large />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('uppercase - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton title="test-title" onPress={() => console.log('pressed')} uppercase />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('iconOne - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton title="test-title" onPress={() => console.log('pressed')} iconOne={LoveWhite} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('iconTwo - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton title="test-title" onPress={() => console.log('pressed')} iconTwo={LoveWhite} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('loading - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton title="test-title" onPress={() => console.log('pressed')} loading />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('disabled - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton title="test-title" onPress={() => console.log('pressed')} disabled />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
