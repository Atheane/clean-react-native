import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { SmallSwitchButton, SubmitButton, useTogglePress, Bell, Colors } from '@clean-rn/ui-mobile';

import { IPhoneNotifications } from '@clean-rn/user/domain';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { fetchUpdateNotifications } from '../../../user/application/commands';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const HEIGHT = Dimensions.get('window').height;
export const NotificationSettings = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { user, pending } = useSelector((state: IRootState) => state.user);

  const hasPhoneNotification = (notif: IPhoneNotifications) => {
    return !user?.properties.config?.notifFirebaseDisabled.includes(notif);
  };

  const { pressed: rewardChecked, onPress: handleToggleReward } = useTogglePress(
    hasPhoneNotification(IPhoneNotifications.REWARD),
  );
  const { pressed: quizzChecked, onPress: handleToggleQuizz } = useTogglePress(
    hasPhoneNotification(IPhoneNotifications.QUIZ),
  );
  const { pressed: sensorsChecked, onPress: handleToggleSensors } = useTogglePress(
    hasPhoneNotification(IPhoneNotifications.SENSORS),
  );

  const dispatch = useDispatch();

  const handleOnSubmit = useCallback(() => {
    let notifFirebaseDisabled: IPhoneNotifications[] = [];
    if (!rewardChecked) {
      notifFirebaseDisabled.push(IPhoneNotifications.REWARD);
    } else {
      notifFirebaseDisabled = notifFirebaseDisabled.filter((pn) => pn !== IPhoneNotifications.REWARD);
    }
    if (!quizzChecked) {
      notifFirebaseDisabled.push(IPhoneNotifications.QUIZ);
    } else {
      notifFirebaseDisabled = notifFirebaseDisabled.filter((pn) => pn !== IPhoneNotifications.QUIZ);
    }
    if (!sensorsChecked) {
      notifFirebaseDisabled.push(IPhoneNotifications.SENSORS);
    } else {
      notifFirebaseDisabled = notifFirebaseDisabled.filter((pn) => pn !== IPhoneNotifications.SENSORS);
    }
    dispatch(fetchUpdateNotifications({ notifFirebaseDisabled }));
  }, [dispatch, rewardChecked, quizzChecked, sensorsChecked]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View>
          <View style={styles.iconContainer}>
            <Bell color={Colors.primary.darkBlue} />
          </View>
          <View style={[styles.container, theme.container.centeredItem]}>
            <View style={styles.rowContainer}>
              <Text style={[theme.text.darkBlue]}>{t('screens.notifications.reward')}</Text>
              <SmallSwitchButton checked={rewardChecked} onToggle={handleToggleReward} />
            </View>
            <View style={styles.rowContainer}>
              <Text style={[theme.text.darkBlue]}>{t('screens.notifications.quizz')}</Text>
              <SmallSwitchButton checked={quizzChecked} onToggle={handleToggleQuizz} />
            </View>
            <View style={styles.rowContainer}>
              <Text style={[theme.text.darkBlue]}>{t('screens.notifications.sensors')}</Text>
              <SmallSwitchButton checked={sensorsChecked} onToggle={handleToggleSensors} />
            </View>
            <View style={styles.buttonContainer}>
              <SubmitButton
                title={t('screens.notifications.submit')}
                uppercase={false}
                loading={pending}
                onSubmit={handleOnSubmit}
              />
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
