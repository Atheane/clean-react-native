import { View, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from '@rneui/themed';

import { LinkButton, LinkButtonColors } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../hoc';
import { Colors } from '../constants';

export const Settings = () => {
  const { t } = useTranslation();

  const handlePressAccountSettings = () => {
    console.log('press account settings');
  };

  const handlePressAppSettings = () => {
    console.log('press app settings');
  };

  const handlePressLove = () => {
    console.log('press love');
  };

  const handlePressContact = () => {
    if (Platform.OS === 'ios') {
      console.log('press contact');
    } else {
      console.log('press contact');
    }
  };

  const onPressLegal = () => {
    console.log('press legal');
  };

  const onPressCgu = () => {
    console.log('press cgu');
  };

  const onPressProfile = () => {
    console.log('press profile');
  };

  const onPressDeleteAccount = () => {
    console.log('press delete account');
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />}
              colorOption={LinkButtonColors.BLUE}
              title={' Account settings'}
              onPress={handlePressAccountSettings}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />}
              colorOption={LinkButtonColors.BLUE}
              title={' App settings'}
              onPress={handlePressAppSettings}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />}
              colorOption={LinkButtonColors.BLUE}
              title={' Notifications'}
              onPress={handlePressAppSettings}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />}
              colorOption={LinkButtonColors.BLUE}
              title={' Support us'}
              onPress={handlePressLove}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />}
              colorOption={LinkButtonColors.BLUE}
              title={' Contact us'}
              onPress={handlePressContact}
            />
          </View>
          <View style={styles.rowContainer}>
            <LinkButton
              iconLeft={() => <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />}
              colorOption={LinkButtonColors.BLUE}
              title={' Personal data'}
              onPress={onPressLegal}
            />
          </View>
          <View style={[styles.rowContainer]}>
            <LinkButton
              iconLeft={() => <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />}
              colorOption={LinkButtonColors.BLUE}
              title={' Terms and Conditions'}
              onPress={onPressCgu}
            />
          </View>
          <View style={[styles.rowContainer]}>
            <LinkButton
              iconLeft={() => <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />}
              colorOption={LinkButtonColors.BLUE}
              title={' My profile'}
              onPress={onPressProfile}
            />
          </View>
          <View style={[styles.rowContainer]}>
            <LinkButton
              iconLeft={() => <Icon type="feather" name="help-circle" color={Colors.primary.darkGrey} />}
              colorOption={LinkButtonColors.BLUE}
              title={' Unsubscribe'}
              onPress={onPressDeleteAccount}
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
    marginTop: 80,
    marginBottom: 100,
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
  },
});
