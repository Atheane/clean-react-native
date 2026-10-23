import { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { PrimaryButton, Validate } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { ICardStackPages } from '../../../shared/presentation/types';

import { Success } from '../assets';

const HEIGHT = Dimensions.get('screen').height;
export const ChangePinSuccess = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate(ICardStackPages.CARD as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <Image source={Success} style={{ width: 200, height: 200 }} />
          <View style={styles.rowContainer}>
            <Text style={[styles.instruction, theme.bank.text.grey]}>
              {t('screens.card.change-pin-success.instruction')}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t('screens.card.change-pin-success.ok')}
              long
              uppercase
              iconOne={Validate}
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
    height: HEIGHT,
    justifyContent: 'center',
    marginTop: -50,
  },
  iconContainer: {
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 50,
  },
  instruction: {
    textAlign: 'justify',
    width: '85%',
    marginVertical: 24,
  },
});
