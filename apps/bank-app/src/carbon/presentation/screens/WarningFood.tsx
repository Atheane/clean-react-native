import { useCallback } from 'react';
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { PrimaryButton, RightChevron, Colors, FontNames } from '@clean-rn/ui-mobile';
import { ICarbonStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { WarningFoodCO2 } from '../assets/images';

export const WarningFood = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate(ICarbonStackPages.FOOD as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <Image source={WarningFoodCO2} style={{ width: 200, height: 200 }} />
          <Text style={styles.title}>{t('screens.warning-food.title')}</Text>
          <Text style={styles.text}>{t('screens.warning-food.text')}</Text>
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
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: { position: 'relative', left: 90, top: 2 },
  title: {
    textAlign: 'center',
    fontFamily: FontNames.Roboto_700Bold,
    fontSize: 26,
    color: Colors.bank.primary.darkBlue,
  },
  text: {
    textAlign: 'justify',
    fontFamily: FontNames.MartelSans_400Regular,
    fontSize: 16,
    color: Colors.bank.primary.darkGrey,
    width: '80%',
    paddingTop: 20,
    paddingBottom: 30,
  },
});
