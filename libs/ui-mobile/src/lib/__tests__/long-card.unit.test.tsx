import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { Love } from '../assets';
import { LongCard } from '../components/long-card';
import { theme } from '../theme';

describe('LongCard - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <LongCard
            text="text"
            onPress={() => {
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
