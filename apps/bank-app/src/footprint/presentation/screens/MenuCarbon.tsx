import { useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';

import {
  Colors,
  LongCardIcon,
  CarbonGradient,
  RightChevronGradient,
  TableCO2Reward,
  SecondaryButton,
  LinkButton,
  LinkButtonColors,
  LoaderSplashScreen,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IFootprintStackPages, IRoutes, ISharedStackPages } from '../../../shared/presentation/types';
import { URL_CO2_REWARD } from '../constants';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const fakeData = [
  ['N.A', 'N.A'],
  ['59€G', '1987 kg CO2'],
  ['59€G', '2039 kg CO2'],
  ['59€G', '2139 kg CO2'],
];

export const MenuCarbon = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();

  const navigation = useNavigation();

  const { email } = useSelector((state: IRootState) => state.auth);
  const handlePressNavigation = (route: IRoutes) => {
    navigation.navigate(route as never);
  };

  const handleOnPressPremium = useCallback(() => {
    navigation.navigate(IFootprintStackPages.MENU_PRIMEUM);
  }, [navigation]);

  const handleOnPressPremiumArticle = useCallback(() => {
    navigation.navigate(ISharedStackPages.MODAL_WEBVIEW, { uid: URL_CO2_REWARD });
  }, [navigation]);

  let userConfigCat: ConfigCatUser | undefined;
  if (!email) {
    userConfigCat = undefined;
  } else {
    userConfigCat = new ConfigCatUser(email.value, email.value);
  }

  const { value: featureTagLegacy, loading: loadingLegacy } = useFeatureFlag(
    'bank-legacy',
    false,
    userConfigCat,
  );

  return loadingLegacy ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container]}>
          <View style={styles.row}>
            <LongCardIcon
              text={t('screens.menu-carbon.2min')}
              leftIcon={CarbonGradient}
              rightIcon={RightChevronGradient}
              onPress={() => handlePressNavigation(IFootprintStackPages.FOOTPRINT_ESTIMATION)}
            />
          </View>
          <View style={[theme.container.card.long, theme.shadow.card]}>
            <View style={[theme.container.centeredItem, styles.titleContainer]}>
              <Text style={theme.text.boldDarkBlue}>{t('screens.menu-carbon.my-reward')}</Text>
            </View>
            <TableCO2Reward
              tableHead={[t('screens.menu-carbon.reward'), t('screens.menu-carbon.emissions')]}
              tableData={featureTagLegacy ? fakeData : [['N.A']]}
              rowLabels={featureTagLegacy ? ['2024', '2023', '2022', '2021'] : ['2023']}
              buttonTitle={t('screens.menu-carbon.receive')}
              tagText={t('screens.menu-carbon.na')}
              onPress={handleOnPressPremium}
            />
            <View style={[theme.container.centeredItem, styles.titleContainer]}>
              <SecondaryButton
                title={t('screens.menu-carbon.evolution')}
                onPress={() => handlePressNavigation(IFootprintStackPages.EVOLUTION_FOOTPRINT)}
                long
              />
            </View>
            <View style={[theme.container.centeredItem, styles.titleContainer]}>
              <LinkButton
                title={t('screens.menu-carbon.link')}
                onPress={handleOnPressPremiumArticle}
                arrow
                colorOption={LinkButtonColors.GREEN}
              />
            </View>
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
    marginBottom: 300,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 30,
  },
  titleContainer: {
    marginTop: 16,
  },
});
