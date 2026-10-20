import { useCallback } from 'react';
import { View, Text, StyleSheet, Image, StyleProp, ViewStyle, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { PrimaryButton, Colors, FontNames, Add } from '@clean-rn/ui-mobile';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { InitKyc as InitKycImg } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const InitKyc = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate(IKycStackPages.MENU as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Image source={InitKycImg} style={{ width: 250, height: 250 }} />
          <Text style={styles.text}>{t('screens.kyc.init.instruction')}</Text>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              long
              title={t('screens.kyc.init.check-identity')}
              iconOne={() => (
                <View style={styles.iconContainer}>
                  <Add style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>} />
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
    marginTop: -40,
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
  text: {
    textAlign: 'center',
    fontFamily: FontNames.MartelSans_400Regular,
    fontSize: 16,
    color: Colors.bank.primary.darkGrey,
    width: '80%',
    paddingTop: 20,
    paddingBottom: 30,
  },
  buttonContainer: {
    marginTop: 0,
  },
});
