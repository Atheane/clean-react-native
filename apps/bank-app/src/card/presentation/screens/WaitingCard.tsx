import { useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { LinkButton } from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { SuccessKyc as CheckmarkImage } from '../../../kyc/presentation/assets/images';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { listTransactions } from '../../../transaction/application/commands';

const HEIGHT = Dimensions.get('window').height;

export const WaitingCard = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { accounts } = useSelector((state: IRootState) => state.account.accounts);

  const dispatch = useDispatch();
  const handleOnPress = useCallback(() => {
    if (accounts && accounts[0]) {
      dispatch(listTransactions({ account: accounts[0] }));
    }
  }, [accounts, dispatch]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          <Image source={CheckmarkImage} style={{ width: 150, height: 150 }} />
          <Text style={[styles.instruction, theme.bank.text.grey]}>
            {t('screens.card.waiting-card.instruction-before-card')}
            <Text style={[styles.instruction, theme.bank.text.boldGrey]}>
              {t('screens.card.waiting-card.instruction-card')}
            </Text>
            <Text style={[styles.instruction, theme.bank.text.grey]}>
              {t('screens.card.waiting-card.instruction-after-card')}
              <LinkButton
                title={t('screens.card.waiting-card.link-instruction')}
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
    marginTop: -100,
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
