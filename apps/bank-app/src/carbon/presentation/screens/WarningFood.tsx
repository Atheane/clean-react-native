import { useCallback } from 'react';
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { PrimaryButton, RightChevron, Colors, FontNames, NEEDS_SMALL_TEXT } from '@clean-rn/ui-mobile';
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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t('screens.warning-food.title')}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={theme.bank.text.lightGrey}>{t('screens.warning-food.text')}</Text>
          </View>

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
  titleContainer: { marginVertical: 32 },
  title: {
    textAlign: 'center',
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: NEEDS_SMALL_TEXT ? 20 : 24,
    color: Colors.bank.primary.darkBlue,
  },
  textContainer: { width: '80%', marginBottom: 24 },
  buttonContainer: {
    marginTop: 24,
  },
});
