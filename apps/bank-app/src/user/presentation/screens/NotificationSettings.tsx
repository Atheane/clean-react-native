import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { SmallSwitchButton, SubmitButton, useTogglePress } from '@clean-rn/ui-mobile';

import { IPhoneNotifications } from '@clean-rn/user/domain';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { BlueBell } from '../../../user/presentation/assets';
import { fetchUpdateNotifications } from '../../../user/application/commands';

const HEIGHT = Dimensions.get('window').height;
export const NotificationSettings = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();
  const { pressed: paymentChecked, onPress: handleTogglePayment } = useTogglePress(true);
  const { pressed: transferChecked, onPress: handleToggleTransfer } = useTogglePress(true);
  const { pressed: thresholdChecked, onPress: handleToggleThreshold } = useTogglePress(true);

  const dispatch = useDispatch();

  const handleOnSubmit = useCallback(() => {
    let notifFirebaseDisabled: IPhoneNotifications[] = [];
    if (!paymentChecked) {
      notifFirebaseDisabled.push(IPhoneNotifications.PAYOUT_INITIATED);
    } else {
      notifFirebaseDisabled = notifFirebaseDisabled.filter(
        (pn) => pn !== IPhoneNotifications.PAYOUT_INITIATED,
      );
    }
    if (!transferChecked) {
      notifFirebaseDisabled.push(IPhoneNotifications.PAYIN_RECEIVED);
    } else {
      notifFirebaseDisabled = notifFirebaseDisabled.filter((pn) => pn !== IPhoneNotifications.PAYIN_RECEIVED);
    }
    if (!thresholdChecked) {
      notifFirebaseDisabled.push(IPhoneNotifications.CARD_TRANSACTION_MODIFIED);
    } else {
      notifFirebaseDisabled = notifFirebaseDisabled.filter(
        (pn) => pn !== IPhoneNotifications.CARD_TRANSACTION_MODIFIED,
      );
    }
    dispatch(fetchUpdateNotifications({ notifFirebaseDisabled }));
  }, [dispatch, paymentChecked, transferChecked, thresholdChecked]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View>
          <View style={styles.iconContainer}>
            <BlueBell />
          </View>
          <View style={[styles.container, theme.bank.container.centeredItem]}>
            <View style={styles.rowContainer}>
              <Text style={[theme.bank.text.darkBlue]}>{t('screens.notifications.payment')}</Text>
              <SmallSwitchButton checked={paymentChecked} onToggle={handleTogglePayment} />
            </View>
            <View style={styles.rowContainer}>
              <Text style={[theme.bank.text.darkBlue]}>{t('screens.notifications.transfer')}</Text>
              <SmallSwitchButton checked={transferChecked} onToggle={handleToggleTransfer} />
            </View>
            <View style={styles.rowContainer}>
              <Text style={[theme.bank.text.darkBlue]}>{t('screens.notifications.threshold')}</Text>
              <SmallSwitchButton checked={thresholdChecked} onToggle={handleToggleThreshold} />
            </View>
            <View style={styles.buttonContainer}>
              <SubmitButton
                title={t('screens.notifications.submit')}
                uppercase={false}
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
