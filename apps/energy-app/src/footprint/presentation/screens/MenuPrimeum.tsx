import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';

import {
  Colors,
  FontNames,
  House as HouseGradient,
  Car as CarGradient,
  Family as FamilyGradient,
  Heat as HeatGradient,
  StepsIndicator,
  LoaderSplashScreen,
  UploadDocumentCard,
  SafeScrollingView,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { IRoutes, IFootprintStackPages } from '../../../shared/presentation/types';

enum IStepStatus {
  INIT = 'INIT', // form request template is created, but is not sent for review
  CANCELED = 'CANCELED', // form request is canceled before analysis
  PENDING = 'PENDING', // form request has pending status
  VALIDATED = 'VALIDATED', // form request is validated
  REFUSED = 'REFUSED', // form request is refused
}

const Header = () => {
  const { t } = useTranslation();

  const { theme } = useTheme();

  const STEPS = [
    t('screens.menu-primeum.step-one'),
    t('screens.menu-primeum.step-two'),
    t('screens.menu-primeum.step-three'),
  ];

  const [currentPosition, _] = useState(1);

  return (
    <View style={styles.header}>
      <View style={styles.whiteContainer}>
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
      </View>
    </View>
  );
};

export const MenuPrimeum = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const handlePressNavigation = (route: IRoutes) => {
    navigation.navigate(route as never);
  };

  const { house, transport, footprint, pending } = useSelector((state: IRootState) => state.footprint);

  const [heatersChecked, setHeatersChecked] = useState(false);
  const [worksChecked, setWorksChecked] = useState(false);
  const [transportChecked, setTransportChecked] = useState(false);
  const [householdChecked, setHouseholdChecked] = useState(false);

  useEffect(() => {
    if (house?.properties?.heaters) {
      setHeatersChecked(true);
    }
    if (house?.properties?.works) {
      setWorksChecked(true);
    }
    if (transport?.properties?.vehicles) {
      setTransportChecked(true);
    }
    if (footprint?.properties?.userId) {
      setHouseholdChecked(true);
    }
  }, [house, transport, footprint, pending]);

  const Cards = () => {
    return pending ? (
      <LoaderSplashScreen />
    ) : (
      <View style={styles.cardContainer}>
        <UploadDocumentCard
          icon={() => <HeatGradient />}
          onPress={() => handlePressNavigation(IFootprintStackPages.HEATERS_SITUATION)}
          text={t('screens.menu-primeum.heat')}
          status={heatersChecked ? IStepStatus.VALIDATED : IStepStatus.INIT}
          errorMessage={undefined}
          loading={false}
          onCancel={() => {
            return;
          }}
        />
        <UploadDocumentCard
          icon={() => <HouseGradient />}
          onPress={() => handlePressNavigation(IFootprintStackPages.WORKS_SITUATION)}
          text={t('screens.menu-primeum.works')}
          status={worksChecked ? IStepStatus.VALIDATED : IStepStatus.INIT}
          errorMessage={undefined}
          loading={false}
          onCancel={() => {
            return;
          }}
        />
        <UploadDocumentCard
          icon={() => <CarGradient />}
          onPress={() => handlePressNavigation(IFootprintStackPages.TRANSPORT_SITUATION)}
          text={t('screens.menu-primeum.transport')}
          status={transportChecked ? IStepStatus.VALIDATED : IStepStatus.INIT}
          errorMessage={undefined}
          loading={false}
          onCancel={() => {
            return;
          }}
        />
        <UploadDocumentCard
          icon={() => <FamilyGradient />}
          onPress={() => handlePressNavigation(IFootprintStackPages.HOUSEHOLD_SITUATION)}
          text={t('screens.menu-primeum.household')}
          status={householdChecked ? IStepStatus.VALIDATED : IStepStatus.INIT}
          errorMessage={undefined}
          loading={false}
          onCancel={() => {
            return;
          }}
        />
      </View>
    );
  };

  return (
    <ErrorBoundary t={t}>
      <Header />
      <View style={styles.contentContainer}>
        <SafeScrollingView>
          <Cards />
        </SafeScrollingView>
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.85,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  instructionContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  darkWhiteContainer: {
    flex: 1,
    backgroundColor: Colors.primary.darkWhite,
    justifyContent: 'center',
  },
  instructionText: {
    fontFamily: FontNames.MartelSans_400Regular,
    lineHeight: 22,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 2,
    backgroundColor: Colors.primary.darkWhite,
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
