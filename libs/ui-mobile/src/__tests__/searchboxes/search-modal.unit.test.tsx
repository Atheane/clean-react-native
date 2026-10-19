import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@rneui/themed';
import { SearchModal } from '../../components/searchboxes/search-modal';
import { theme } from '../../theme';
import { Love } from '../../assets';

describe('SearchModal - ', () => {
  describe('minimal props - ', () => {
    it('renders as before', () => {
      const tree = render(
        <ThemeProvider theme={theme}>
          <SearchModal
            icon={Love}
            label="string"
            placeholder="string"
            data={[{ key: 'string', value: 'string' }]}
            onSelect={() => {
              return null;
            }}
          />
        </ThemeProvider>,
      );
      expect(tree).toMatchSnapshot();
    });
  });
});
