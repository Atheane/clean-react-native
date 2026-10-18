import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { SelectNumber } from '../../components/inputs/select-number';
import { theme } from '../../theme';
import { Love } from '../../assets';

describe('SelectNumber - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SelectNumber
            label="label"
            value={3}
            onChange={() => {
              return null;
            }}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('horizontal - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SelectNumber
            label="label"
            value={3}
            onChange={() => {
              return null;
            }}
            horizontal
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('icon - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SelectNumber
            label="label"
            value={3}
            onChange={() => {
              return null;
            }}
            icon={Love}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
