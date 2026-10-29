import { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { Colors, Tabs, StepsIndicator, LoaderSplashScreen } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { MainHeatForm, SanitaryHeatForm, SecondaryHeatForm } from './forms';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

export const HeatersForm = () => {
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
  const changeTab = (tabIndex: number) => {
    console.log('Tab changed', tabIndex);
    setCurrentTab(tabIndex);
  };

  const { user, pending } = useSelector((state: IRootState) => state.user);

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
                  <MainHeatForm />
                </View>,
                <View style={styles.tabPageContainer}>
                  <SanitaryHeatForm />
                </View>,
                <View style={styles.tabPageContainer}>
                  <SecondaryHeatForm />
                </View>,
              ]}
              changeTab={changeTab}
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
