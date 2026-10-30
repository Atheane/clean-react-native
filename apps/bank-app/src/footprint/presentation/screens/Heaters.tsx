import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { Colors, Tabs, StepsIndicator, LoaderSplashScreen } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IFootprintStackPages } from '../../../shared/presentation/types';
import { MainHeatForm, SanitaryHeatForm, SecondaryHeatForm } from './forms';

export const Heaters = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const STEPS = [
    t('screens.heat-primeum.step-one'),
    t('screens.heat-primeum.step-two'),
    t('screens.heat-primeum.step-three'),
  ];

  const SUBTITLES = [
    t('screens.heat-primeum.subtitle-main'),
    t('screens.heat-primeum.subtitle-sanitary'),
    t('screens.heat-primeum.subtitle-secondary'),
  ];

  const changeStep = (position: number) =>
    console.log('Navigation set to: ' + position + ' - ' + STEPS[position - 1]);

  const [currentTab, setCurrentTab] = useState(0);
  const handleOnChangeTab = (tabIndex: number) => {
    console.log('Tab changed', tabIndex);
    setCurrentTab(tabIndex);
  };

  const { user, pending } = useSelector((state: IRootState) => state.user);

  const navigation = useNavigation();

  const handleGoToNextTab = useCallback(
    (nextIndex: number) => {
      console.log('handleGoToNextTab nextIndex', nextIndex);
      if (nextIndex === 0) {
        navigation.navigate(IFootprintStackPages.MENU_PRIMEUM as never);
      } else {
        setCurrentTab(nextIndex);
      }
      return nextIndex;
    },
    [navigation],
  );

  return pending ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView backgroundColor={Colors.primary.darkWhite}>
        <View>
          <View style={[styles.whiteContainer]}>
            <StepsIndicator currentPosition={1} labels={STEPS} onCirclePress={changeStep} />
          </View>

          <View style={[styles.darkWhiteContainer]}>
            <View style={styles.subtitleContainer}>
              <Text style={theme.text.boldDarkBlue}>{SUBTITLES[currentTab]}</Text>
              <Text
                style={theme.text.lightBlue}
              >{`${user?.properties.address?.str} ${user?.properties.address?.zip} ${user?.properties.address?.city}`}</Text>
            </View>
            <Tabs
              tabsCount={3}
              color={Colors.primary.darkBlue}
              colorInactive={Colors.primary.grey}
              icons={[]}
              titles={[]}
              backgroundColor={Colors.primary.darkWhite}
              contents={[
                <View style={styles.tabPageContainer}>
                  <MainHeatForm goToNextTab={handleGoToNextTab} />
                </View>,
                <View style={styles.tabPageContainer}>
                  <SanitaryHeatForm goToNextTab={handleGoToNextTab} />
                </View>,
                <View style={styles.tabPageContainer}>
                  <SecondaryHeatForm goToNextTab={handleGoToNextTab} />
                </View>,
              ]}
              value={currentTab}
              onChangeTab={handleOnChangeTab}
            />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.primary.darkWhite,
  },
  darkWhiteContainer: {
    flex: 1,
    backgroundColor: Colors.primary.darkWhite,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  tabPageContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary.darkWhite,
  },
});
