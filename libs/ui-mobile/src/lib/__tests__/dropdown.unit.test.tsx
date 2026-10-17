import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { Dropdown } from '../components/dropdown';
import { theme } from '../theme';
import { LoveGreen } from '../assets';
import { Colors } from '../constants';

const fakeData = [
  {
    key: '1',
    value: 'one',
  },
];

describe('Dropdown - ', () => {
  describe('minimal props - ', () => {
    const onSelect = jest.fn();
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <Dropdown
            label="label"
            placeholder="placeholder"
            data={fakeData}
            icon={LoveGreen}
            onSelect={onSelect}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('labelColor - ', () => {
    it('renders as before', () => {
      const onSelect = jest.fn();
      const tree = render(
        <ThemeProvider theme={theme}>
          <Dropdown
            label="label"
            placeholder="placeholder"
            data={fakeData}
            icon={LoveGreen}
            labelColor={Colors.text.grey}
            onSelect={onSelect}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('defaultValue - ', () => {
    it('renders as before', () => {
      const onSelect = jest.fn();
      const tree = render(
        <ThemeProvider theme={theme}>
          <Dropdown
            label="label"
            placeholder="placeholder"
            data={fakeData}
            icon={LoveGreen}
            defaultValue={'one'}
            onSelect={onSelect}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
