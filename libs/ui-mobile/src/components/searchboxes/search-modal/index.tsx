import { FC, useCallback, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  VirtualizedList,
  TouchableOpacity,
  Modal,
  Platform,
  Dimensions,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from '@rneui/themed';

import { Close } from '../../../assets';
import { Colors } from '../../../constants';

import { TextInput } from '../../inputs/text-input';

type IData = {
  key: string;
  value: string;
};

type IProps = {
  icon: FC<SvgProps>;
  label: string;
  placeholder: string;
  data: IData[];
  onSelect: (item: IData) => void;
};

export const SearchModal = (props: IProps) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<IData[]>([]);
  const clearSearch = () => {
    setSearchQuery('');
    setFilteredData([]);
    setSelectedItem(undefined);
  };
  const contains = (item: IData, formattedQuery: string) => {
    const formattedKey = item.key.toLocaleLowerCase();
    const formattedLabel = item.value.toLocaleLowerCase();
    if (formattedKey.includes(formattedQuery) || formattedLabel.includes(formattedQuery)) {
      return true;
    }
    return false;
  };

  const handleSearchQuery = useCallback(
    (query: string) => {
      if (query === '') {
        clearSearch();
        return;
      }
      setSearchQuery(query);
      const formattedQuery = query.toLocaleLowerCase();
      const filteredData = props.data.filter((item: IData) => contains(item, formattedQuery));
      setFilteredData(filteredData);
    },
    [props.data],
  );

  const [selectedItem, setSelectedItem] = useState<IData>();

  const handleSelect = useCallback(
    (item: IData) => {
      setSelectedItem(item);
      props.onSelect(item);
      setVisible(false);
    },
    [props],
  );

  const renderLabel = (item: IData) => `${item.key} - ${item.value}`.slice(0, 25) + '...';

  const handleOnPress = useCallback(() => {
    clearSearch();
    setVisible(true);
  }, []);

  const handleClearQuery = useCallback(() => {
    setVisible(false);
  }, []);

  const handleClearInput = useCallback(() => {
    clearSearch();
    setVisible(true);
  }, []);

  const keyExtractor = useCallback((item: IData) => item.key, []);
  const getItem = useCallback((data: IData[], index: number) => data[index], []);
  const getItemCount = useCallback(() => filteredData.length, [filteredData]);
  const renderItem = useCallback(
    ({ item }: { item: IData }) => (
      <View key={item.key} style={styles.itemContainer}>
        <TouchableOpacity onPress={() => handleSelect(item)}>
          <Text style={theme.bank.text.grey}>{renderLabel(item)}</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleSelect, theme.bank.text.grey],
  );

  return (
    <View>
      <TextInput
        placeholder={props.placeholder}
        label={props.label}
        IconLeft={props.icon}
        lowerCase
        value={selectedItem ? renderLabel(selectedItem) : ''}
        onFocus={handleOnPress}
        labelColor={Colors.bank.secondary.pink}
      />
      {selectedItem && (
        <TouchableOpacity onPress={handleClearInput} style={styles.closeIcon}>
          <Close />
        </TouchableOpacity>
      )}
      <Modal visible={visible} animationType={Platform.OS === 'android' ? 'fade' : 'none'}>
        <SafeAreaView style={styles.modalContainer}>
          <TextInput
            placeholder={props.placeholder}
            label={props.label}
            IconLeft={props.icon}
            lowerCase
            value={searchQuery}
            onChange={handleSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearQuery} style={styles.closeIconModal}>
              <Close />
            </TouchableOpacity>
          )}
          <View style={styles.listContainer}>
            <VirtualizedList
              data={filteredData}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              getItemCount={getItemCount}
              getItem={getItem}
              windowSize={5}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const COEFF = 0.75;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 24,
  },
  modalContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width * COEFF,
    paddingVertical: 10,
    borderBottomColor: Colors.bank.primary.lightGrey,
    borderBottomWidth: 1,
  },
  closeIcon: { position: 'relative', bottom: 25, left: Dimensions.get('window').width * COEFF - 35 },
  closeIconModal: { position: 'relative', bottom: 25, left: Dimensions.get('window').width * COEFF - 35 },
});
