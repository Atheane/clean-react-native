import { useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { LongCard } from '@shared/presentation/components';
import { navigateTo } from '@shared/infrastructure/redux/actions';

import { Colors, FontNames } from '@shared/presentation/constants';
import { BottomBackground, ViewBackground } from '@account/presentation/components';
import { useHideBottomBar } from '@shared/presentation/hooks';

import { ExportPdfGradient, Ibanv2 } from '@account/presentation/assets';
import { Routes } from '@shared/presentation/types';
import { HOME_STACK_PAGES } from '@account/presentation/types';

import { PdfViewer } from '@shared/presentation/components';
import { pdfUrls } from '@account/presentation/constants';

export const AccountStatementsCurrentMonth = () => <PdfViewer url={pdfUrls.accountStatementCurrentMonth} />;
export const AccountStatementsLastThreeMonths = () => (
  <PdfViewer url={pdfUrls.accountStatementLastThreeMonth} />
);
export const AccountStatementsAll = () => <PdfViewer url={pdfUrls.accountStatementAll} />;
export const ExportPdfIban = () => <PdfViewer url={pdfUrls.iban} />;

export const AccountStatements = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOnPress = useCallback((route: Routes) => {
    //console.log('handleOnPressCurrentMonth');
    dispatch(navigateTo({ route }));
  }, []);

  useHideBottomBar();

  return (
    <ViewBackground background={BottomBackground}>
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
            onPress={() => handleOnPress(HOME_STACK_PAGES.ACCOUNT_STATEMENTS_CURRENT_MONTH)}
          />
          <LongCard
            text={t('screens.accountStatements.cards.threeLastMonths')}
            icon={ExportPdfGradient}
            onPress={() => handleOnPress(HOME_STACK_PAGES.ACCOUNT_STATEMENTS_LAST_THREE_MONTHS)}
          />
          <LongCard
            text={t('screens.accountStatements.cards.all')}
            icon={ExportPdfGradient}
            onPress={() => handleOnPress(HOME_STACK_PAGES.ACCOUNT_STATEMENTS_ALL)}
          />
          <LongCard
            text={t('screens.accountStatements.cards.iban')}
            icon={Ibanv2}
            onPress={() => handleOnPress(HOME_STACK_PAGES.EXPORT_PDF_IBAN)}
          />
        </View>
      </View>
    </ViewBackground>
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
    color: Colors.text.darkBlue,
    paddingVertical: 8,
  },
  boldText: {
    fontFamily: FontNames.Roboto_700Bold,
  },
  normalText: {
    fontFamily: FontNames.Roboto_400Regular,
  },
});
