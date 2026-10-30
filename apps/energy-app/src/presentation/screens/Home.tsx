import { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { BalanceList, CardScroller, Colors } from '@clean-rn/ui-mobile';
import { ISharedStackPages } from '../types';
import { eventsCardsContent } from '../constants/eventsCardsContent';
import { FontNames, NEEDS_SMALL_TEXT } from '../constants';

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
    title: 'Your comfort price of this month',
    value: 1234.5,
    unit: '€/kWh',
  },
];

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
          <View style={styles.introContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>
                Time to test your energy consumption knowledge and earn some €G coins! Complete today’s quiz
                to earn "NUMBER" €G coins.
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textContent}>
                  Various questions will become available after 4 hours. And remember, you can answer the same
                  question many times until you get the correct answer! The point is to learn something new
                  after all.
                </Text>
              </View>
              <View style={[styles.textContainer, { marginTop: 40, marginBottom: -20 }]}>
                <Text style={styles.boldText}>Here is today's quiz:</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardsContainer}>
            <CardScroller
              data={eventsCardsContent}
              height={300}
              onPress={handleOnPressCard}
              onDelete={handleOnDelete}
            />
          </View>
          {
            //   icon: () => <QuestionMarkIcon />,
            //   title: 'Nice work!',
            //   component:
            //     "Hopefully you've learned a thing or two about energy consumption while earning  <NUMBER OF COINS> €G coins. Keep an eye out for future quizzes for more chances to test your knowledge and earn €G coins.",
            //   uid: 'quiz_general_9',
            // },
          }
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
    backgroundColor: Colors.primary.white,
  },
  introContainer: {
    flex: 1,
    padding: 30,
    marginTop: 20,
    marginBottom: -20,
  },
  contentContainer: {
    marginTop: 20,
  },
  textContainer: {
    marginBottom: 8,
  },
  textTitle: {
    color: Colors.primary.darkGrey,
    fontSize: NEEDS_SMALL_TEXT ? 14 : 16,
    fontFamily: FontNames.Roboto_700Bold,
    fontWeight: '700',
    textAlign: 'justify',
  },
  textContent: {
    color: Colors.primary.grey,
    fontSize: NEEDS_SMALL_TEXT ? 12 : 14,
    fontFamily: FontNames.Roboto_400Regular,
    fontWeight: '400',
    textAlign: 'justify',
  },
  boldText: {
    color: Colors.primary.darkGrey,
    fontSize: NEEDS_SMALL_TEXT ? 14 : 16,
    fontFamily: FontNames.Roboto_700Bold,
    fontWeight: '700',
  },
  cardsContainer: {
    flex: 1,
    marginTop: -50,
    marginBottom: 50,
  },
  balanceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 280,
  },
});
