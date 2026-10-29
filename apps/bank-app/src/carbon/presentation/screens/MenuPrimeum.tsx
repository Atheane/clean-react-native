import { StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
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
} from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRoutes, ICarbonStackPages } from '../../../shared/presentation/types';

export const MenuPrimeum = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();

  const navigation = useNavigation();
  const handlePressNavigation = (route: IRoutes) => {
    navigation.navigate(route as never);
  };

  const dispatch = useDispatch();

  const STEPS = [
    t('screens.menu-primeum.step-one'),
    t('screens.menu-primeum.step-two'),
    t('screens.menu-primeum.step-three'),
  ];

  const Cards = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <TouchCardCheck
            icon={HeatGradient}
            onPress={() => handlePressNavigation(ICarbonStackPages.HEATERS_FORM)}
            text={t('screens.menu-primeum.heat')}
            checked
          />
          <TouchCardCheck
            icon={HouseGradient}
            onPress={() => handlePressNavigation(ICarbonStackPages.WORKS_FORM)}
            text={t('screens.menu-primeum.works')}
          />
        </View>
        <View style={styles.row}>
          <TouchCardCheck
            icon={CarGradient}
            onPress={() => handlePressNavigation(ICarbonStackPages.TRANSPORTS_FORM)}
            text={t('screens.menu-primeum.transport')}
          />
          <TouchCardCheck
            icon={FamilyGradient}
            onPress={() => handlePressNavigation(ICarbonStackPages.HOUSEHOLD_FORM)}
            text={t('screens.menu-primeum.household')}
          />
        </View>
      </View>
    );
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView backgroundColor={Colors.primary.darkWhite}>
        <View>
          <View style={[styles.whiteContainer]}>
            <StepsIndicator
              labels={STEPS}
              currentPosition={2}
              onCirclePress={(position: number) => console.log('Navigation set to: ' + STEPS[position - 1])}
            />
          </View>
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

          <View style={[styles.darkWhiteContainer, theme.container.centeredItem]}>
            <Cards />
          </View>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  whiteContainer: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
  darkWhiteContainer: {
    backgroundColor: Colors.primary.darkWhite,
  },
  instructionContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 30,
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
