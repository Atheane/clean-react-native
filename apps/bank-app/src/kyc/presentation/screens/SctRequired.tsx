import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useTheme } from '@rneui/themed';

import { Bic as BicIcon, Iban as IbanIcon, CopyValueClipboard } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

export const SctRequired = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { accounts } = useSelector((state: IRootState) => state.account.accounts);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container]}>
          <Text style={[styles.instruction, theme.bank.text.grey]}>
            {t('screens.kyc.sct-required.instruction')}
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
    marginTop: 200,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 400,
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
