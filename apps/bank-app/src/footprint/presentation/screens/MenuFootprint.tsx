import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useFeatureFlag, User as ConfigCatUser } from 'configcat-react';

import {
  Colors,
  LongCardIcon,
  CarbonGradient,
  RightChevronGradient,
  LoaderSplashScreen,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IFootprintStackPages, IRoutes } from '../../../shared/presentation/types';
import { CardPremium, CardCarbonFootPrint } from '../../../shared/presentation/assets/svg';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

export const MenuFootprint = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const { email } = useSelector((state: IRootState) => state.auth);
  const handlePressNavigation = (route: IRoutes) => {
    navigation.navigate(route as never);
  };

  let userConfigCat: ConfigCatUser | undefined;
  if (!email) {
    userConfigCat = undefined;
  } else {
    userConfigCat = new ConfigCatUser(email.value, email.value);
  }

  const { loading: loadingLegacy } = useFeatureFlag('bank-legacy', false, userConfigCat);

  return loadingLegacy ? (
    <LoaderSplashScreen />
  ) : (
    <ErrorBoundary t={t}>
      <View style={styles.container}>
        <View style={styles.row}>
          <LongCardIcon
            text={t('screens.menu-footprint.2min')}
            leftIcon={CarbonGradient}
            rightIcon={RightChevronGradient}
            onPress={() => handlePressNavigation(IFootprintStackPages.FOOTPRINT_ESTIMATION)}
          />
        </View>
        <View style={styles.row}>
          <LongCardIcon
            text={t('screens.menu-footprint.my-reward')}
            leftIcon={CardPremium}
            rightIcon={RightChevronGradient}
            onPress={() => handlePressNavigation(IFootprintStackPages.MENU_PRIMEUM)}
          />
        </View>
        <View style={styles.row}>
          <LongCardIcon
            text={t('screens.menu-footprint.my-emissions')}
            leftIcon={CardCarbonFootPrint}
            rightIcon={RightChevronGradient}
            onPress={() => handlePressNavigation(IFootprintStackPages.EVOLUTION_FOOTPRINT)}
          />
        </View>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    justifyContent: 'space-around',
    paddingVertical: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 16,
  },
  titleContainer: {
    marginTop: 16,
  },
});
