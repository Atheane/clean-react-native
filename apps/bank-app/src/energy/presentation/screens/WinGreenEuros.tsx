import { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  TouchEventCard,
  Colors,
  FontNames,
  Quiz,
  TotalReward,
  Challenge,
  ScrollBackground,
} from '@clean-rn/ui-mobile';
import { GreenEurosGroup, TopLeaves as TopBackgroundImage } from '../assets/images';
import { useTheme } from '@rneui/themed';
import { IEnergyStackPages } from '../../../shared/presentation/types';
import { fetchRefresh } from '../../../auth/application/commands';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary } from '../../../shared/presentation/hoc/ErrorBoundary';

export const TopDownBackground = () => {
  return (
    <View>
      <View style={styles.topDecoration}>
        <Image source={TopBackgroundImage} />
      </View>
      <View style={styles.euroDecoration}>
        <Image source={GreenEurosGroup} />
      </View>
    </View>
  );
};

export const WinGreenEuros = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const { energy } = useSelector((state: IRootState) => state.energy);

  const handleOnPressQuiz = () => {
    navigation.navigate(IEnergyStackPages.MODAL_QUIZ, { uid: energy?.properties.currentQuiz?.id });
  };

  const handleOnPressChallenge = () => {
    console.log('handleOnPressChallenge');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRefresh());
  }, [dispatch]);

  return (
    <ErrorBoundary t={t}>
      <View style={styles.container}>
        <ScrollBackground background={TopDownBackground} initialScroll={-20} window={1}>
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{t('screens.energy.win-green-euros.header')}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>{t('screens.energy.win-green-euros.description')}</Text>
            </View>
            <View style={styles.cards}>
              <View style={theme.container.centeredItems}>
                {energy?.properties.currentQuiz && (
                  <TouchEventCard
                    uid={energy?.properties.currentQuiz.id}
                    title={'Quiz'}
                    icon={() => <Quiz />}
                    onPress={handleOnPressQuiz}
                    // text={'Exploitez la puissance du soleil !'}
                    vertical
                  />
                )}
                {energy?.properties.currentChallenge && (
                  <TouchEventCard
                    uid={'challenge'}
                    title={'Challenge'}
                    icon={() => <Challenge />}
                    onPress={handleOnPressChallenge}
                    text={t('screens.energy.quiz.challenge-description')}
                    vertical
                  />
                )}
              </View>
            </View>
            <TotalReward
              totalRewards={energy?.properties.totalRewards as number}
              title={t('screens.energy.win-green-euros.total-green-euros')}
              loading={false}
              size="big"
            />
          </View>
        </ScrollBackground>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.primary.white,
    fontFamily: FontNames.MartelSans_700Bold,
    lineHeight: 50,
  },
  titleContainer: {
    width: Dimensions.get('window').width * 0.62,
  },
  descriptionContainer: {
    marginTop: 5,
    width: Dimensions.get('window').width * 0.8,
  },
  description: {
    fontSize: 16,
    color: Colors.primary.white,
    fontFamily: FontNames.MartelSans_400Regular,
    lineHeight: 24,
  },
  topDecoration: {},
  euroDecoration: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  cards: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  totalRewardContainer: {},
});
