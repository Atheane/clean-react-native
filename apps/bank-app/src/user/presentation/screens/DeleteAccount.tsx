import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { Colors, PrimaryButton, Validate } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IProfileStackPages } from '../../../shared/presentation/types';

const HEIGHT = Dimensions.get('window').height;

export const DeleteAccount = () => {
  // translations
  const { t } = useTranslation();

  // css theme
  const { theme } = useTheme();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleOnPress = useCallback(() => {
    console.log('dispatch(deleteUserAccount())');
    navigation.navigate(IProfileStackPages.GOODBYE as never);
  }, [navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={styles.textContainer}>
            <Text style={[theme.bank.text.darkBlue, styles.text]}>
              {t('screens.profile.delete-account.description')}
            </Text>
          </View>
          <View style={[theme.bank.container.centeredItem, styles.button]}>
            <PrimaryButton
              title={t('screens.profile.delete-account.button')}
              uppercase
              onPress={handleOnPress}
              loading={false}
              long
              iconOne={Validate}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bank.primary.white,
  },
  textContainer: {
    marginTop: 0,
    width: '80%',
  },
  text: {
    textAlign: 'left',
  },
  button: {
    marginTop: 50,
  },
});
