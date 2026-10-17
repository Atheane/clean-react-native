import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { LinkButton } from '../components/link-button';
import { LinkButtonColors } from '../types';
import { theme } from '../theme';
import { LoveGreen } from '../assets';

describe('LinkButton - ', () => {
  describe('pink & pressed & arrow -', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <LinkButton
            title="test-title"
            onPress={() => console.log('pressed')}
            colorOption={LinkButtonColors.PINK}
            pressed
            arrow
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('pink & unpressed & noarrow -', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <LinkButton
            title="test-title"
            onPress={() => console.log('pressed')}
            colorOption={LinkButtonColors.PINK}
            pressed={false}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('blue & pressed & arrow -', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <LinkButton
            title="test-title"
            onPress={() => console.log('pressed')}
            colorOption={LinkButtonColors.BLUE}
            pressed
            arrow
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('blue & unpressed & noarrow -', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <LinkButton
            title="test-title"
            onPress={() => console.log('pressed')}
            colorOption={LinkButtonColors.BLUE}
            pressed={false}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('green & pressed & arrow -', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <LinkButton
            title="test-title"
            onPress={() => console.log('pressed')}
            colorOption={LinkButtonColors.GREEN}
            pressed
            arrow
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('green & unpressed & noarrow -', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <LinkButton
            title="test-title"
            onPress={() => console.log('pressed')}
            colorOption={LinkButtonColors.GREEN}
            pressed={false}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('white & pressed & arrow -', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <LinkButton
            title="test-title"
            onPress={() => console.log('pressed')}
            colorOption={LinkButtonColors.WHITE}
            pressed
            arrow
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('white & unpressed & noarrow -', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <LinkButton
            title="test-title"
            onPress={() => console.log('pressed')}
            colorOption={LinkButtonColors.WHITE}
            pressed={false}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('green & unpressed & iconOne -', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <LinkButton
            onPress={() => console.log('pressed')}
            colorOption={LinkButtonColors.PINK}
            pressed={false}
            iconOne={LoveGreen}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
