import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IconTextItem, KycIban, KycInvoice, KycTaxes } from '@clean-rn/ui-mobile';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { BillEdf, Iban, Taxes } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const HostResidenceProofList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(
    ({
      instruction,
      imageSource,
      anotherInstruction,
      docPickerVisible,
    }: {
      instruction: string;
      imageSource: ImageSourcePropType;
      anotherInstruction?: string;
      docPickerVisible?: boolean;
    }) => {
      navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT as never, {
        instruction,
        imageSource,
        anotherInstruction,
        docPickerVisible,
      });
    },
    [navigation],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={[styles.instructionContainer]}>
            <Text style={[theme.bank.text.darkBlue, styles.instruction]}>
              {t('screens.kyc.host-residence-proof-list.instruction')}
            </Text>
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycInvoice}
              text={t('screens.kyc.residence-proof-list.invoice')}
              onPress={() =>
                handleOnPress({
                  instruction: t('screens.kyc.host-invoice.instruction'),
                  imageSource: BillEdf,
                  anotherInstruction: t('screens.kyc.host-invoice.another-instruction'),
                  docPickerVisible: true,
                })
              }
            />
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycIban}
              text={t('screens.kyc.residence-proof-list.iban')}
              onPress={() =>
                handleOnPress({
                  instruction: t('screens.kyc.host-iban.instruction'),
                  imageSource: Iban,
                  docPickerVisible: true,
                })
              }
            />
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycTaxes}
              text={t('screens.kyc.residence-proof-list.tax')}
              onPress={() =>
                handleOnPress({
                  instruction: t('screens.kyc.host-taxes.instruction'),
                  imageSource: Taxes,
                  docPickerVisible: true,
                })
              }
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
  instructionContainer: {
    marginBottom: 50,
  },
  itemContainer: {
    marginVertical: 32,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
  },
});
