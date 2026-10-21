import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@rneui/themed';

import { SmallSwitchButton, SubmitButton, useTogglePress } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { BlueBell } from '../assets';
import { useDispatch } from 'react-redux';

const HEIGHT = Dimensions.get('window').height;
export const NotificationSettings = () => {
  const { theme } = useTheme();

  const { t } = useTranslation();
  const { pressed: paymentChecked, onPress: handleTogglePayment } = useTogglePress(true);
  const { pressed: transferChecked, onPress: handleToggleTransfer } = useTogglePress(true);
  const { pressed: thresholdChecked, onPress: handleToggleThreshold } = useTogglePress(true);

  const dispatch = useDispatch();

  const handleOnSubmit = useCallback(() => {
    // TODO: implement
    // dispatch(
    //   updateNotifications({
    //     payment: paymentChecked,
    //     transfer: transferChecked,
    //     threshold: thresholdChecked,
    //   }),
    // );
  }, []);

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
