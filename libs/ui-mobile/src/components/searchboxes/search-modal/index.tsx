// test UI for this one
import { FC, useCallback, useEffect, useState } from 'react';
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

import { CloseBg as Close } from '../../../assets';
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
  shouldClearSearch?: boolean;
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
  }, []);

  useEffect(() => {
    if (props.shouldClearSearch) {
      clearSearch();
    }
  }, [props.shouldClearSearch]);

  const keyExtractor = useCallback((item: IData) => item.key, []);
  const getItem = useCallback((data: IData[], index: number) => data[index], []);
  const getItemCount = useCallback(() => filteredData.length, [filteredData]);
  const renderItem = useCallback(
    ({ item }: { item: IData }) => (
      <View key={item.key} style={Platform.OS !== 'web' && styles.itemContainer}>
        <TouchableOpacity onPress={() => handleSelect(item)}>
          <Text style={theme.text.grey}>{renderLabel(item)}</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleSelect, theme.text.grey],
  );

  return (
    <View style={Platform.OS === 'web' ? styles.containerWeb : styles.container}>
      <View style={Platform.OS === 'web' ? styles.inputWrapperWeb : styles.inputWrapper}>
        <TextInput
          placeholder={props.placeholder}
          label={props.label}
          IconLeft={props.icon}
          lowerCase
          value={selectedItem ? renderLabel(selectedItem) : ''}
          onFocus={handleOnPress}
          labelColor={Colors.secondary.pink}
        />
        {selectedItem && (
          <TouchableOpacity onPress={handleClearInput} style={styles.closeButton}>
            <Close width={16} height={16} />
          </TouchableOpacity>
        )}
      </View>

      <Modal visible={visible} animationType={Platform.OS === 'android' ? 'fade' : 'none'}>
        <SafeAreaView style={Platform.OS === 'web' ? styles.modalContainerWeb : styles.modalContainer}>
          <View style={Platform.OS === 'web' ? styles.inputWrapperWeb : styles.inputWrapper}>
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
              <TouchableOpacity onPress={handleClearQuery} style={styles.closeButtonModal}>
                <Close width={16} height={16} />
              </TouchableOpacity>
            )}
          </View>

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
  container: {
    alignItems: 'center',
    width: '100%',
  },
  containerWeb: {
    width: '100%',
    paddingLeft: 24,
    paddingTop: 24,
  },
  inputWrapper: {
    position: 'relative',
    alignItems: 'center',
    width: '90%',
  },
  inputWrapperWeb: {
    position: 'relative',
    width: '75%',
  },
  textInputContainer: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: '55%',
    right: 10,
    transform: [{ translateY: -10 }],
    padding: 5,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
  },
  modalContainerWeb: {
    width: '100%',
    paddingLeft: 40,
    paddingTop: 40,
  },
  listContainer: {
    marginTop: 24,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width * COEFF,
    paddingVertical: 10,
    borderBottomColor: Colors.primary.lightGrey,
    borderBottomWidth: 1,
  },
  closeButtonModal: {
    position: 'absolute',
    top: '55%',
    left: Platform.OS === 'web' ? 360 : null,
    right: Platform.OS === 'web' ? null : 40,
    transform: [{ translateY: -10 }],
    padding: 5,
    zIndex: 1,
  },
});
