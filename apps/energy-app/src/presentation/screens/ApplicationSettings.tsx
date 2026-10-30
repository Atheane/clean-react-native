import { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { LinkButton, LinkButtonColors, Flag as FlagGradient, Colors } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../presentation/hoc';
import { ISettingsStackPages } from '../../presentation/types';

import { Bell } from '@clean-rn/ui-mobile';

const HEIGHT = Dimensions.get('window').height;
export const ApplicationSettings = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handlePressNotifications = useCallback(() => {
    navigation.navigate(ISettingsStackPages.NOTIFICATIONS as never);
  }, [navigation]);

  const handlePressLanguages = useCallback(() => {
    navigation.navigate(ISettingsStackPages.LANGUAGES as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={[styles.rowContainer, { marginVertical: 8 }]}>
            <LinkButton
              iconLeft={() => <Bell color={Colors.primary.grey} style={{ marginRight: 16 }} />}
              colorOption={LinkButtonColors.BLUE}
              title={'Notifications'}
              onPress={handlePressNotifications}
            />
          </View>
          <View style={[styles.rowContainer, { marginVertical: 8 }]}>
            <LinkButton
              iconLeft={() => <FlagGradient color={Colors.primary.grey} style={{ marginRight: 16 }} />}
              colorOption={LinkButtonColors.BLUE}
              title={'Languages'}
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
