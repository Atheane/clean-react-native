import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { CB, WhiteEye } from '../assets';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { PrimaryButton, Secured4Digits } from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const HEIGHT = Dimensions.get('screen').height;
export const ShowPin = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { card } = useSelector((state: IRootState) => state.card);

  const [digits, setDigits] = useState<number[]>([]);
  useEffect(() => {
    if (!card || !card.properties || !card.properties.pin) {
      return;
    }
    const digits = card.properties.pin.value.split('').map((digit: string) => parseInt(digit, 10));
    setDigits(digits);
  }, [card]);

  const [hidden, setHidden] = useState(true);

  const handleOnPress = () => {
    setHidden(false);
    const interval = setTimeout(() => {
      setHidden(true);
    }, 3000);
    return () => clearInterval(interval);
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={CB} style={{ width: 150, height: 300 }} />
          </View>
          <View style={styles.rowContainer}>
            <Text style={theme.text.boldDarkBlue}>{t('screens.card.show-pin.instruction')}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Secured4Digits digits={digits} hidden={hidden} />
          </View>
          <View style={styles.rowContainer}>
            <PrimaryButton
              title={t('screens.card.show-pin.see-my-pin')}
              iconLeft={WhiteEye}
              onPress={handleOnPress}
              uppercase
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
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
