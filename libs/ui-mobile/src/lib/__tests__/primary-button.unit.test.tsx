import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { Love } from '../assets';
import { PrimaryButton } from '../components/primary-button';
import { theme } from '../theme';

describe('PrimaryButton - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton
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
          <PrimaryButton
            title="test-title"
            onPress={() => {
              return null;
            }}
            large
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
          <PrimaryButton
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
          <PrimaryButton
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
  describe('iconTwo - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton
            title="test-title"
            onPress={() => {
              return null;
            }}
            iconTwo={Love}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('loading - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton
            title="test-title"
            onPress={() => {
              return null;
            }}
            loading
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('disabled - ', () => {
    it('true - renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <PrimaryButton
            title="test-title"
            onPress={() => {
              return null;
            }}
            disabled
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
