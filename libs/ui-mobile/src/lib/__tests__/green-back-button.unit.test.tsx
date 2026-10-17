import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { GreenBackButton } from '../components/buttons/green-back-button';
import { theme } from '../theme';

describe('GreenBackButton - ', () => {
  it('renders as before', () => {
    const tree = render(
      <ThemeProvider theme={theme}>
        <GreenBackButton
          onPress={() => {
            return null;
          }}
        />
      </ThemeProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
