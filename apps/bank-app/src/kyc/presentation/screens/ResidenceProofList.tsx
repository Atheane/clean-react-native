import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IDocumentType } from '@clean-rn/kyc/domain';
import { Colors, FontNames, IconTextItem, KycInvoice, KycTaxes } from '@clean-rn/ui-mobile';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

const HEIGHT = Dimensions.get('window').height;

export const ResidenceProofList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(
    (documentType: IDocumentType) => {
      navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT as never, { docType: documentType, step: 1 });
    },
    [navigation],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={[styles.titleContainer]}>
            <Text style={[theme.bank.text.boldDarkBlue, styles.title]}>
              {t('screens.kyc.residence-proof-list.instruction')}
            </Text>
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycInvoice}
              text={t('screens.kyc.residence-proof-list.invoice')}
              onPress={() => handleOnPress(IDocumentType.INVOICE)}
            />
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycTaxes}
              text={t('screens.kyc.residence-proof-list.tax')}
              onPress={() => handleOnPress(IDocumentType.TAX_STATEMENT)}
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
    alignItems: 'center',
    marginTop: 120,
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
  titleContainer: {
    marginBottom: 50,
  },
  itemContainer: {
    marginVertical: 32,
  },
  title: {
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
    fontFamily: FontNames.MartelSans_400Regular,
    fontSize: 16,
    color: Colors.bank.primary.darkGrey,
    width: '80%',
    paddingTop: 20,
    paddingBottom: 30,
  },
  buttonContainer: {
    marginTop: 0,
  },
});
