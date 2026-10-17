import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { GreenBackButton } from '../components/green-back-button';
import { theme } from '../theme';

describe('GreenBackButton - ', () => {
  it('renders as before', () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <GreenBackButton onPress={() => console.log('pressed')} />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
