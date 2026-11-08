import { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { SafeScrollingView } from '@clean-rn/ui-mobile';

import { RootStack } from './RootStack';
import { navigationRef, goToInitRoute } from './navigationRef';
import { LinkingConfiguration } from './LinkingConfiguration';

import { ErrorBoundary } from '../hoc';
import { Colors } from '../constants';

const NavigationUI = () => {
  const [isTablet, setIsTablet] = useState(true);
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    const checkIsTablet = () => {
      const isDeviceTablet = DeviceInfo.isTablet();
      setIsTablet(isDeviceTablet);
    };

    checkIsTablet();
  }, []);

  return isTablet ? (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.container.centeredItem]}>
          <Text style={[styles.instruction, theme.text.grey, { fontSize: 16 }]}>
            {t('tablets.instruction')}
          </Text>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  ) : (
    <NavigationContainer ref={navigationRef as any} linking={LinkingConfiguration} onReady={goToInitRoute}>
      <RootStack />
    </NavigationContainer>
  );
};

export { NavigationUI };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    height: Dimensions.get('window').height,
    marginTop: -100,
  },
  instruction: {
    textAlign: 'justify',
    width: '85%',
    marginVertical: 24,
  },
});
