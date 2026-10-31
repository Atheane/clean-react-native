import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';

import {
  Colors,
  FontNames,
  TouchCardStatus,
  House as HouseGradient,
  Car as CarGradient,
  Family as FamilyGradient,
  Heat as HeatGradient,
  StepsIndicator,
  LoaderSplashScreen,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRoutes, IFootprintStackPages } from '../../../shared/presentation/types';

enum ISituationStatus {
  INIT = 'INIT', // form request template is created, but is not sent for review
  CANCELED = 'CANCELED', // form request is canceled before analysis
  PENDING = 'PENDING', // form request has pending status
  VALIDATED = 'VALIDATED', // form request is validated
  REFUSED = 'REFUSED', // form request is refused
}

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

  const { house, transport, footprint, pending } = useSelector((state: IRootState) => state.footprint);

  const [heatersChecked, setHeatersChecked] = useState(false);
  const [worksChecked, setWorksChecked] = useState(false);
  const [transportChecked, setTransportChecked] = useState(false);
  const [householdChecked, setHouseholdChecked] = useState(false);

  useEffect(() => {
    if (house?.properties?.heaters && house.properties.heaters.length > 0) {
      setHeatersChecked(true);
    }
    if (house?.properties?.works && house.properties.works.length > 0) {
      setWorksChecked(true);
    }
    if (transport?.properties?.cars && transport.properties.cars.length > 0) {
      setTransportChecked(true);
    }
    if (footprint) {
      setHouseholdChecked(true);
    }
  }, [house, transport, footprint]);

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
          <TouchCardStatus
            icon={() => <HeatGradient />}
            onPress={() => handlePressNavigation(IFootprintStackPages.HEATERS)}
            text={t('screens.menu-primeum.heat')}
            status={heatersChecked ? ISituationStatus.VALIDATED : ISituationStatus.INIT}
          />
          <TouchCardStatus
            icon={() => <HouseGradient />}
            onPress={() => handlePressNavigation(IFootprintStackPages.WORKS)}
            text={t('screens.menu-primeum.works')}
            status={worksChecked ? ISituationStatus.VALIDATED : ISituationStatus.INIT}
          />
        </View>
        <View style={styles.row}>
          <TouchCardStatus
            icon={() => <CarGradient />}
            onPress={() => handlePressNavigation(IFootprintStackPages.TRANSPORT)}
            text={t('screens.menu-primeum.transport')}
            status={transportChecked ? ISituationStatus.VALIDATED : ISituationStatus.INIT}
          />
          <TouchCardStatus
            icon={() => <FamilyGradient />}
            onPress={() => handlePressNavigation(IFootprintStackPages.HOUSEHOLD)}
            text={t('screens.menu-primeum.household')}
            status={householdChecked ? ISituationStatus.VALIDATED : ISituationStatus.INIT}
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

          <View style={[theme.container.centeredItem, styles.blockCards]}>
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
  blockCards: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: Colors.primary.white,
  },
  cardContainer: {
    marginBottom: 300,
    backgroundColor: Colors.primary.white,
  },
});
