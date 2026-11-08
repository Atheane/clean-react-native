import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { Colors, PrimaryButton, Validate } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { fetchDeleteUserAccount } from '../../application/commands';

const HEIGHT = Dimensions.get('window').height;

export const DeleteAccount = () => {
  // translations
  const { t } = useTranslation();

  // css theme
  const { theme } = useTheme();

  const dispatch = useDispatch();
  const handleOnPress = useCallback(() => {
    dispatch(fetchDeleteUserAccount());
  }, [dispatch]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={styles.textContainer}>
            <Text style={[theme.text.darkBlue, styles.text]}>
              {t('screens.parameters.delete-account.description')}
            </Text>
          </View>
          <View style={[theme.container.centeredItem, styles.button]}>
            <PrimaryButton
              title={t('screens.parameters.delete-account.button')}
              uppercase
              onPress={handleOnPress}
              loading={false}
              long
              iconLeft={() => <Validate />}
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
    backgroundColor: Colors.primary.white,
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
