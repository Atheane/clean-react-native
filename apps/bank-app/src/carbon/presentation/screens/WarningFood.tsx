import { useCallback } from 'react';
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { PrimaryButton, RightChevron, Colors, FontNames } from '@clean-rn/ui-mobile';
import { ICarbonStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { WarningFoodCO2 } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const WarningFood = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate(ICarbonStackPages.FOOD as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <Image source={WarningFoodCO2} style={{ width: 250, height: 250 }} />
          <Text style={styles.title}>{t('screens.warning-food.title')}</Text>
          <Text style={styles.text}>{t('screens.warning-food.text')}</Text>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              long
              title={t('screens.warning-food.next')}
              iconTwo={() => (
                <View style={styles.iconContainer}>
                  <RightChevron style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>} />
                </View>
              )}
              onPress={handleOnPress}
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
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT,
    marginTop: -60,
  },
  iconContainer: { position: 'relative', right: -75, top: 2 },
  title: {
    textAlign: 'center',
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 26,
    color: Colors.bank.primary.darkBlue,
  },
  text: {
    textAlign: 'center',
    fontFamily: FontNames.MartelSans_400Regular,
    fontSize: 16,
    color: Colors.bank.primary.darkGrey,
    width: '75%',
    paddingTop: 20,
    paddingBottom: 30,
  },
  buttonContainer: {
    marginTop: 24,
  },
});
