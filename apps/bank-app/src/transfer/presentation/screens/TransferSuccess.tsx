import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { PrimaryButton } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IHomeStackPages } from '../../../shared/presentation/types';

const HEIGHT = Dimensions.get('window').height;

export const TransferSuccess = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const handleOnPress = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: IHomeStackPages.HOME }] as never,
    });
  }, [navigation]);
  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Text>Transfer Success</Text>
          <PrimaryButton
            title={t('screens.transfer-success.button')}
            onPress={handleOnPress}
            long
            uppercase
          />
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
