import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { SwitchButton } from '../../components/buttons/switch-button';
import { theme } from '../../theme';

type IData = { key: string; value: string };

const fakeData = [
  { key: 'opt1', value: 'Option 1' },
  { key: 'opt2', value: 'Option 2' },
] as [IData, IData];

describe('SwitchButton - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SwitchButton
            options={fakeData}
            onToggle={() => {
              return null;
            }}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
  describe('label - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SwitchButton
            options={fakeData}
            onToggle={() => {
              return null;
            }}
            label="Label"
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
