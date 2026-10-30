import { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { LinkButton, LinkButtonColors, Flag as FlagGradient } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IParametersStackPages } from '../../../shared/presentation/types';

import { GradientBell } from '../../../user/presentation/assets';

const HEIGHT = Dimensions.get('window').height;
export const ApplicationSettings = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handlePressNotifications = useCallback(() => {
    navigation.navigate(IParametersStackPages.NOTIFICATON_SETTINGS as never);
  }, [navigation]);

  const handlePressLanguages = useCallback(() => {
    navigation.navigate(IParametersStackPages.LANGUAGES as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={[styles.rowContainer, { marginVertical: 8 }]}>
            <LinkButton
              iconLeft={() => <GradientBell style={{ marginLeft: 0, marginRight: 20 }} />}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.application-settings.notifications')}
              onPress={handlePressNotifications}
            />
          </View>
          <View style={[styles.rowContainer, { marginVertical: 8 }]}>
            <LinkButton
              iconLeft={() => <FlagGradient style={{ marginLeft: 8, marginRight: 20 }} />}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.application-settings.languages')}
              onPress={handlePressLanguages}
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
    justifyContent: 'flex-start',
    marginTop: 60,
    height: HEIGHT,
  },
  iconContainer: {
    marginLeft: 8,
    marginRight: 12,
  },
  textContainer: {
    marginTop: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginVertical: 10,
  },
});
