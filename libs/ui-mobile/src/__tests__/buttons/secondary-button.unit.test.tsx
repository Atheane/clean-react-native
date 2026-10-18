import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { Love } from '../../assets';
import { SecondaryButton } from '../../components/buttons/secondary-button';
import { theme } from '../../theme';

describe('SecondaryButton - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SecondaryButton
            title="test-title"
            onPress={() => {
              return null;
            }}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('large - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SecondaryButton
            title="test-title"
            onPress={() => {
              return null;
            }}
            long
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('uppercase - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SecondaryButton
            title="test-title"
            onPress={() => {
              return null;
            }}
            uppercase
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('iconOne - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SecondaryButton
            title="test-title"
            onPress={() => {
              return null;
            }}
            iconOne={Love}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
