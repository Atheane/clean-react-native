import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { TextInput } from '../components/inputs/text-input';
import { theme } from '../theme';
import { Colors } from '../constants';
import { Love } from '../assets';

describe('TextInput - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <TextInput placeholder="placeolder" />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('label - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <TextInput placeholder="placeolder" label={'test'} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('labelColor - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <TextInput placeholder="placeolder" label={'test'} labelColor={Colors.text.grey} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('lowerCase - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <TextInput placeholder="placeolder" lowerCase />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('icon - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <TextInput placeholder="placeolder" icon={Love} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('lowerCase & icon - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <TextInput placeholder="placeolder" lowerCase icon={Love} />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
