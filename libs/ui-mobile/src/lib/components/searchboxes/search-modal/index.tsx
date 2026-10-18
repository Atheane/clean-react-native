import { FC, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

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

  const handleSearchQuery = useCallback((query: string) => {
    if (query === '') {
      clearSearch();
      return;
    }
    setSearchQuery(query);
    const formattedQuery = query.toLocaleLowerCase();
    const filteredData = props.data.filter((item: IData) => contains(item, formattedQuery));
    setFilteredData(filteredData);
  }, []);

  const [selectedItem, setSelectedItem] = useState<IData>();

  const handleSelect = useCallback((item: IData) => {
    setSelectedItem(item);
    props.onSelect(item);
    setVisible(false);
  }, []);

  const renderLabel = (item: IData) => `${item.key} - ${item.value}`.slice(0, 29) + '...';

  const handleOnPress = useCallback(() => {
    clearSearch();
    setVisible(true);
  }, []);

  const handleClearQuery = useCallback(() => {
    clearSearch();
  }, []);

  const handleClearInput = useCallback(() => {
    clearSearch();
    setVisible(true);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={props.placeholder}
        label={props.label}
        icon={props.icon}
        lowerCase
        clearButtonMode="always"
        value={selectedItem ? renderLabel(selectedItem) : ''}
        onFocus={handleOnPress}
        labelColor={Colors.bank.secondary.pink}
      />
      {Platform.OS === 'android' && selectedItem && (
        <TouchableOpacity onPress={handleClearInput} style={styles.closeIcon}>
          <Close />
        </TouchableOpacity>
      )}
      <Modal visible={visible} animationType={Platform.OS === 'android' ? 'fade' : 'none'}>
        <SafeAreaView style={styles.modalContainer}>
          <TextInput
            placeholder={props.placeholder}
            label={props.label}
            icon={props.icon}
            lowerCase
            clearButtonMode="always"
            value={searchQuery}
            onChange={handleSearchQuery}
            autoFocus
          />
          {Platform.OS === 'android' && searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearQuery} style={styles.closeIconModal}>
              <Close />
            </TouchableOpacity>
          )}
          <FlatList
            data={filteredData}
            keyExtractor={(item: IData) => item.key}
            renderItem={({ item }: { item: IData }) => (
              <View key={item.key} style={styles.itemContainer}>
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <Text style={styles.itemText}>{renderLabel(item)}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modalContainer: {
    flex: 1,
    marginTop: 50,
    marginLeft: 30,
  },
  itemContainer: {
    flex: 1,
    width: '90%',
    paddingVertical: 10,
    borderBottomColor: Colors.bank.primary.lightGrey,
    borderBottomWidth: 1,
  },
  itemText: {
    color: Colors.bank.primary.darkGrey,
  },
  closeIcon: {
    position: 'absolute',
    right: 16,
    top: 58,
  },
  closeIconModal: {
    position: 'absolute',
    right: 58,
    top: 56,
  },
});
