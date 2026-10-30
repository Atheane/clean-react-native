import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';

import {
  Colors,
  FontNames,
  TouchCardCheck,
  HouseGradient,
  CarGradient,
  FamilyGradient,
  HeatGradient,
  StepsIndicator,
  LoaderSplashScreen,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRoutes, IFootprintStackPages } from '../../../shared/presentation/types';
import { useDispatch, useSelector } from 'react-redux';
import { getHouse } from '../../application/commands';

export const MenuPrimeum = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();

  const navigation = useNavigation();
  const handlePressNavigation = (route: IRoutes) => {
    navigation.navigate(route as never);
  };

  const STEPS = [
    t('screens.menu-primeum.step-one'),
    t('screens.menu-primeum.step-two'),
    t('screens.menu-primeum.step-three'),
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHouse());
  }, [dispatch]);

  const { house, transport, household, pending } = useSelector((state: IRootState) => state.carbon);

  const [heatersChecked, setHeatersChecked] = useState(false);
  const [worksChecked, setWorksChecked] = useState(false);
  const [transportChecked, setTransportChecked] = useState(false);
  const [householdChecked, setHouseholdChecked] = useState(false);

  useEffect(() => {
    if (house?.house?.properties?.heaters && house.house.properties.heaters.length > 0) {
      setHeatersChecked(true);
    }
    if (house?.house?.properties?.works && house.house.properties.works.length > 0) {
      setWorksChecked(true);
    }
    if (transport?.transport?.properties?.cars && transport.transport.properties.cars.length > 0) {
      setTransportChecked(true);
    }
    if (household) {
      setHouseholdChecked(true);
    }
  }, [house, transport, household]);

  const [currentPosition, setCurrentPosition] = useState(1);
  useEffect(() => {
    if (heatersChecked && worksChecked && transportChecked && householdChecked) {
      setCurrentPosition(2);
    }
  }, [heatersChecked, worksChecked, transportChecked, householdChecked]);

  const Cards = () => {
    return pending ? (
      <LoaderSplashScreen />
    ) : (
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <TouchCardCheck
            icon={HeatGradient}
            onPress={() => handlePressNavigation(IFootprintStackPages.HEATERS)}
            text={t('screens.menu-primeum.heat')}
            checked={heatersChecked}
          />
          <TouchCardCheck
            icon={HouseGradient}
            onPress={() => handlePressNavigation(IFootprintStackPages.WORKS)}
            text={t('screens.menu-primeum.works')}
            checked={worksChecked}
          />
        </View>
        <View style={styles.row}>
          <TouchCardCheck
            icon={CarGradient}
            onPress={() => handlePressNavigation(IFootprintStackPages.TRANSPORT)}
            text={t('screens.menu-primeum.transport')}
            checked={transportChecked}
          />
          <TouchCardCheck
            icon={FamilyGradient}
            onPress={() => handlePressNavigation(IFootprintStackPages.HOUSEHOLD)}
            text={t('screens.menu-primeum.household')}
            checked={householdChecked}
          />
        </View>
      </View>
    );
  };

  return (
    <ErrorBoundary t={t}>
      <View>
        <View style={[styles.whiteContainer]}>
          <StepsIndicator
            labels={STEPS}
            currentPosition={currentPosition}
            onCirclePress={(position: number) => console.log('Navigation set to: ' + STEPS[position - 1])}
          />
        </View>
        <View style={styles.darkWhiteContainer}>
          <View style={[styles.instructionContainer]}>
            <Text>
              <Text style={[styles.instructionText, theme.text.grey]}>
                {t('screens.menu-primeum.instruction')}
              </Text>
              <Text style={[styles.instructionText, theme.text.grey, { color: Colors.primary.green }]}>
                {t('screens.menu-primeum.ref-year')}
              </Text>
            </Text>
          </View>

          <View style={[theme.container.centeredItem]}>
            <Cards />
          </View>
        </View>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  whiteContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.white,
  },
  instructionContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 30,
  },
  darkWhiteContainer: {
    backgroundColor: Colors.primary.darkWhite,
  },
  instructionText: {
    fontFamily: FontNames.MartelSans_400Regular,
    lineHeight: 22,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
  },
  cardContainer: {
    marginBottom: 300,
  },
});
