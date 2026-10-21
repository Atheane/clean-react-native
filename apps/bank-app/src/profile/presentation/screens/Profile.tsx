import { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';

import { LinkButton, LinkButtonColors } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IProfileStackPages } from '../../../shared/presentation/types';

import { GradientBell } from '../assets';

const HEIGHT = Dimensions.get('screen').height;
export const Profile = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handlePressApplicationSettings = useCallback(() => {
    navigation.navigate(IProfileStackPages.NOTIFICATON_SETTINGS as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={GradientBell}
              colorOption={LinkButtonColors.BLUE}
              title={t('screens.profile.notifications')}
              onPress={handlePressApplicationSettings}
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
    justifyContent: 'flex-start',
  },
  iconContainer: {
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
  },
});
