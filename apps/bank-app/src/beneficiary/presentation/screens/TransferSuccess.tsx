import { useCallback } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '@clean-rn/ui-mobile';

import { SuccessTransfer } from '../assets/images';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { ISharedStackPages } from '../../../shared/presentation/types';

const HEIGHT = Dimensions.get('window').height;

export const TransferSuccess = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const handleOnPress = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: ISharedStackPages.HOME }] as never,
    });
  }, [navigation]);
  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Image source={SuccessTransfer} style={{ width: 300, height: 300 }} />
          <View style={styles.buttonContainer}>
            <PrimaryButton
              title={t('screens.transfer-success.button')}
              onPress={handleOnPress}
              long
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 80,
  },
});
