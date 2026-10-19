import { useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IAccount, IStatementsPeriod } from '@clean-rn/account/domain';

import {
  LongCard,
  Colors,
  FontNames,
  BottomLeavesBg,
  useHideBottomBar,
  ExportPdfGradient,
  Ibanv2,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IHomeStackPages } from '../../../shared/presentation/types';

export const AccountStatements = () => {
  const { t } = useTranslation();
  const {
    params: { account },
  } = useRoute() as { params: { account: IAccount } };
  const navigation = useNavigation();

  const handleOnDownloadStatements = (period: IStatementsPeriod) => {
    navigation.navigate(IHomeStackPages.ACCOUNT_STATEMENTS_PDF, { account, period });
  };

  const handleOnDownloadRIB = useCallback(() => {
    navigation.navigate(IHomeStackPages.RIB_PDF, { account });
  }, [navigation, account]);

  useHideBottomBar();

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView fixedHeight>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={{ ...styles.text, ...styles.boldText }}>{t('screens.account-statements.bold')}</Text>
            <Text style={{ ...styles.text, ...styles.normalText }}>
              {t('screens.account-statements.normal')}
            </Text>
          </View>
          <View style={styles.cardsContainer}>
            <LongCard
              text={t('screens.account-statements.cards.last-month')}
              icon={() => (
                <View style={styles.iconContainer}>
                  <ExportPdfGradient />
                </View>
              )}
              pressable
              onPress={() => handleOnDownloadStatements(IStatementsPeriod.LAST_MONTH)}
            />
            <LongCard
              text={t('screens.account-statements.cards.last-trimester')}
              icon={() => (
                <View style={styles.iconContainer}>
                  <ExportPdfGradient />
                </View>
              )}
              pressable
              onPress={() => handleOnDownloadStatements(IStatementsPeriod.LAST_TRIMESTER)}
            />
            <LongCard
              text={t('screens.account-statements.cards.all')}
              icon={() => (
                <View style={styles.iconContainer}>
                  <ExportPdfGradient />
                </View>
              )}
              pressable
              onPress={() => handleOnDownloadStatements(IStatementsPeriod.ALL)}
            />
            <LongCard
              text={t('screens.account-statements.cards.rib')}
              icon={Ibanv2}
              pressable
              onPress={handleOnDownloadRIB}
            />
          </View>
        </View>
      </SafeScrollingView>
      <View style={styles.bottom}>
        <BottomLeavesBg />
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 30,
  },
  textContainer: {
    alignItems: 'flex-start',
    left: Dimensions.get('window').width * 0.1,
  },
  cardsContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  iconContainer: {
    marginTop: 6,
  },
  text: {
    fontSize: 14,
    lineHeight: 19,
    color: Colors.bank.primary.darkBlue,
    paddingVertical: 8,
  },
  boldText: {
    fontFamily: FontNames.Roboto_700Bold,
  },
  normalText: {
    fontFamily: FontNames.Roboto_400Regular,
  },
  bottom: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.7,
  },
});
