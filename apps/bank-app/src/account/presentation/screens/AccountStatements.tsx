import { useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  LongCard,
  Colors,
  FontNames,
  BottomLeavesBg,
  useHideBottomBar,
  ExportPdfGradient,
  Ibanv2,
  WebViewer,
} from '@clean-rn/ui-mobile';

import { IRoutes, IHomeStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

export const AccountStatementsCurrentMonth = () => <WebViewer url={pdfUrls.accountStatementCurrentMonth} />;
export const AccountStatementsLastThreeMonths = () => (
  <WebViewer url={pdfUrls.accountStatementLastThreeMonth} />
);
export const AccountStatementsAll = () => <WebViewer url={pdfUrls.accountStatementAll} />;
export const ExportPdfIban = () => <WebViewer url={pdfUrls.iban} />;

export const AccountStatements = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const handleOnPress = useCallback(
    (route: IRoutes) => {
      navigation.navigate(route as never);
    },
    [navigation],
  );

  useHideBottomBar();

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={{ ...styles.text, ...styles.boldText }}>{t('screens.accountStatements.bold')}</Text>
            <Text style={{ ...styles.text, ...styles.normalText }}>
              {t('screens.accountStatements.normal')}
            </Text>
          </View>
          <View style={styles.cardsContainer}>
            <LongCard
              text={t('screens.accountStatements.cards.currentMonth')}
              icon={ExportPdfGradient}
              onPress={() => handleOnPress(IHomeStackPages.ACCOUNT_STATEMENTS_CURRENT_MONTH)}
            />
            <LongCard
              text={t('screens.accountStatements.cards.threeLastMonths')}
              icon={ExportPdfGradient}
              onPress={() => handleOnPress(IHomeStackPages.ACCOUNT_STATEMENTS_LAST_THREE_MONTHS)}
            />
            <LongCard
              text={t('screens.accountStatements.cards.all')}
              icon={ExportPdfGradient}
              onPress={() => handleOnPress(IHomeStackPages.ACCOUNT_STATEMENTS_ALL)}
            />
            <LongCard
              text={t('screens.accountStatements.cards.iban')}
              icon={Ibanv2}
              onPress={() => handleOnPress(IHomeStackPages.EXPORT_PDF_IBAN)}
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
    top: Dimensions.get('window').height * 0.65,
  },
});
