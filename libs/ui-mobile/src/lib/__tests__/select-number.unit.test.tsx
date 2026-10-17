import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { SelectNumber } from '../components/select-number';
import { theme } from '../theme';
import { LoveGreen } from '../assets';

describe('SelectNumber - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SelectNumber label="label" value={3} onChange={console.log} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('horizontal - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SelectNumber label="label" value={3} onChange={console.log} horizontal />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('icon - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SelectNumber label="label" value={3} onChange={console.log} icon={LoveGreen} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
