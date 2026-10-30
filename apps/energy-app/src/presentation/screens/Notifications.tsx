import { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { SmallSwitchButton, SubmitButton, Bell, Colors } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '..//hoc';

const HEIGHT = Dimensions.get('window').height;

const KEYS = ['type1', 'type2', 'type3'];

export const Notifications = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState<{ [key: string]: boolean }>({});

  const dispatch = useDispatch();

  const handleOnSubmit = useCallback(() => {
    console.log('dispatch(saveNotificationsPreferences)');
    return;
  }, [dispatch]);

  const handleToggleNotification = (key: string) => {
    const newNotifications = { ...notifications };
    newNotifications[key] = !newNotifications[key];
    setNotifications(newNotifications);
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View>
          <View style={styles.iconContainer}>
            <Bell color={Colors.primary.grey} />
          </View>
          <View style={[styles.container, theme.container.centeredItem]}>
            {KEYS.map((key: string) => (
              <View style={styles.rowContainer}>
                <Text style={[theme.text.darkBlue]}>{'Notification ' + key}</Text>
                <SmallSwitchButton
                  checked={notifications[key]}
                  onToggle={() => handleToggleNotification(key)}
                />
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <SubmitButton title={'Submit'} uppercase={false} loading={false} onSubmit={handleOnSubmit} />
            </View>
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
    marginTop: -80,
  },
  iconContainer: {
    marginTop: 40,
    alignItems: 'flex-end',
    marginRight: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  buttonContainer: {
    marginTop: 120,
  },
});
