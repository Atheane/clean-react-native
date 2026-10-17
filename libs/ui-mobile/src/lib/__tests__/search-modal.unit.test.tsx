import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { SearchModal } from '../components/search-modal';
import { theme } from '../theme';
import { LoveGreen } from '../assets';

describe('SearchModal - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SearchModal
            icon={LoveGreen}
            label="string"
            placeholder="string"
            data={[{ key: 'string', value: 'string' }]}
            onSelect={console.log}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
