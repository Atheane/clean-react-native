import { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { BalanceList, CardScroller, Colors } from '@clean-rn/ui-mobile';
import { ISharedStackPages } from '../types';
import { eventsCardsContent } from '../constants/eventsCardsContent';

import { ErrorBoundary, SafeScrollingView } from '../hoc';

const FAKE_DATA = [
  {
    uid: 'bank',
    title: 'Total €G won',
    value: 65.8,
    unit: '€G',
  },
  {
    uid: 'mcp',
    title: 'Your confort price of this month',
    value: 1234.5,
    unit: '€/kWh',
  },
];

const HEIGHT = Dimensions.get('window').height;

export const Home = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const handleOnPressCard = useCallback(
    (uid: string) => {
      navigation.navigate(ISharedStackPages.MODAL_CONTENT, { uid });
    },
    [navigation],
  );

  const handleOnPressBalance = useCallback(() => {
    console.log('press balance');
  }, []);

  const dispatch = useDispatch();

  const handleOnDelete = useCallback(
    (uid: string) => {
      console.log('card deleted', uid);
    },
    [dispatch],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <CardScroller
            data={eventsCardsContent}
            height={300}
            onPress={handleOnPressCard}
            onDelete={handleOnDelete}
          />
          <View style={styles.balanceContainer}>
            <BalanceList
              data={FAKE_DATA}
              noDataLabel="No data"
              onPress={handleOnPressBalance}
              color={Colors.primary.grey}
            />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.white,
    height: HEIGHT,
  },
  balanceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
