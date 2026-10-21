import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import {
  IDocumentCategory,
  IDocumentProperties,
  IDocumentStatus,
  IDocumentStatusCode,
  IDocumentType,
} from '@clean-rn/kyc/domain';
import { IconTextItem, KycInvoice, KycTaxes } from '@clean-rn/ui-mobile';

import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { initializeDocument } from '../../application/commands/document';

import { BillEdf, Taxes } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const HostResidenceProofList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const dispatch = useDispatch();

  const handleOnPress = useCallback(
    ({
      instruction,
      imageSource,
      anotherInstruction,
      lastInstruction,
      docPickerVisible,
      documentProperties,
    }: {
      instruction: string;
      imageSource: ImageSourcePropType;
      anotherInstruction?: string;
      lastInstruction?: string;
      docPickerVisible?: boolean;
      documentProperties: IDocumentProperties;
    }) => {
      dispatch(initializeDocument({ documentProperties }));
      navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT as never, {
        instruction,
        imageSource,
        anotherInstruction,
        lastInstruction,
        docPickerVisible,
      });
    },
    [navigation, dispatch],
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
                  lastInstruction: t('screens.kyc.host-invoice.last-instruction'),
                  docPickerVisible: true,
                  documentProperties: {
                    category: IDocumentCategory.RESIDENCE_PROOF,
                    typeId: IDocumentType.INVOICE,
                    name: 'residence-proof.host-invoice.recto',
                    status: IDocumentStatus.INIT,
                    createdAt: new Date(),
                    statusCode: IDocumentStatusCode.INITIAL,
                  },
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
                  documentProperties: {
                    category: IDocumentCategory.RESIDENCE_PROOF,
                    typeId: IDocumentType.TAX_CERTIFICATE,
                    name: 'residence-proof.host-taxes.recto',
                    status: IDocumentStatus.INIT,
                    createdAt: new Date(),
                    statusCode: IDocumentStatusCode.INITIAL,
                  },
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
