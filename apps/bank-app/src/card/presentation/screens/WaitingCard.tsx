import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { CopyValueClipboard, Bic as BicIcon, Iban as IbanIcon } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { SuccessKyc as CheckmarkImage } from '../../../kyc/presentation/assets/images';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const HEIGHT = Dimensions.get('window').height;

export const WaitingCard = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { accounts } = useSelector((state: IRootState) => state.account.accounts);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.container.centeredItem]}>
          <Image source={CheckmarkImage} style={{ width: 150, height: 150 }} />
          <Text style={[styles.instruction, theme.text.grey]}>
            {t('screens.card.waiting-card.instruction-before-card')}
            <Text style={[styles.instruction, theme.text.boldGrey]}>
              {t('screens.card.waiting-card.instruction-card')}
            </Text>
            <Text style={[styles.instruction, theme.text.grey]}>
              {t('screens.card.waiting-card.instruction-after-card')}
            </Text>
            {accounts && accounts[0] && (
              <View>
                <CopyValueClipboard value={accounts[0].iban.value} icon={IbanIcon} />
                <CopyValueClipboard value={accounts[0].bic.value} icon={BicIcon} />
              </View>
            )}
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
    marginTop: -40,
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
