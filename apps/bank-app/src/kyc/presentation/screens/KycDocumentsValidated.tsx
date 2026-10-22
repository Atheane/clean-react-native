import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useTheme } from '@rneui/themed';

import { Bic as BicIcon, Iban as IbanIcon, CopyValueClipboard } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { SuccessKyc as CheckmarkImage } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const KycDocumentsValidated = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { accounts } = useSelector((state: IRootState) => state.account.accounts);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Text style={[styles.title, theme.bank.text.boldDarkBlue]}>{t('screens.kyc.complete.title')}</Text>
          <Image source={CheckmarkImage} style={{ width: 150, height: 150 }} />
          <Text style={[styles.instruction, theme.bank.text.grey]}>
            <Text style={[styles.instruction, theme.bank.text.boldGrey]}>
              {t('screens.kyc.complete.congrats')}
            </Text>
            {t('screens.kyc.complete.instruction')}
          </Text>
          {accounts && accounts[0] && (
            <View>
              <CopyValueClipboard value={accounts[0].iban.value} icon={IbanIcon} />
              <CopyValueClipboard value={accounts[0].bic.value} icon={BicIcon} />
            </View>
          )}
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
