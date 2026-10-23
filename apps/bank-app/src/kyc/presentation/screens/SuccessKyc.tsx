import { useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { LinkButton } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { SuccessKyc as CheckmarkImage } from '../assets/images';
import { ITransactionStackPages } from '../../../shared/presentation/types';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const HEIGHT = Dimensions.get('window').height;

export const SuccessKyc = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { accounts } = useSelector((state: IRootState) => state.account.accounts);
  const navigation = useNavigation();
  const handleOnPress = useCallback(() => {
    if (accounts && accounts[0]) {
      navigation.navigate(ITransactionStackPages.TRANSACTIONS as never);
    }
  }, [accounts, navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <Text style={[styles.title, theme.bank.text.boldDarkBlue]}>{t('screens.kyc.success.title')}</Text>
          <Image source={CheckmarkImage} style={{ width: 150, height: 150 }} />
          <Text style={[styles.instruction, theme.bank.text.grey]}>
            <Text style={[styles.instruction, theme.bank.text.boldGrey]}>
              {t('screens.kyc.success.congrats')}
            </Text>
            {t('screens.kyc.success.instruction-before-card')}
            <Text style={[styles.instruction, theme.bank.text.boldGrey]}>
              {t('screens.kyc.success.instruction-card')}
            </Text>
            <Text style={[styles.instruction, theme.bank.text.grey]}>
              {t('screens.kyc.success.instruction-after-card')}
              <LinkButton
                title={t('screens.kyc.success.link-instruction')}
                onPress={handleOnPress}
                inline={[theme.bank.text.darkBlue, { fontSize: 14 }]}
              />
            </Text>
          </Text>
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    marginTop: -50,
  },
  title: {
    margin: 24,
  },
  instruction: {
    textAlign: 'justify',
    width: '80%',
    marginVertical: 24,
  },
});
