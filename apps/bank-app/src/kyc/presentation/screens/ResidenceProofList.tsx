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
import { Colors, FontNames, IconTextItem, KycInvoice, KycTaxes } from '@clean-rn/ui-mobile';

import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { initializeDocument } from '../../application/commands/document';

import { BillEdf, Taxes } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const ResidenceProofList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const dispatch = useDispatch();

  const handleOnPress = useCallback(
    ({
      instruction,
      imageSource,
      anotherInstruction,
      docPickerVisible,
      documentProperties,
    }: {
      instruction: string;
      imageSource: ImageSourcePropType;
      anotherInstruction?: string;
      docPickerVisible?: boolean;
      documentProperties: IDocumentProperties;
    }) => {
      dispatch(initializeDocument({ documentProperties }));
      navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT as never, {
        instruction,
        imageSource,
        anotherInstruction,
        docPickerVisible,
      });
    },
    [navigation, dispatch],
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
              onPress={() =>
                handleOnPress({
                  instruction: t('screens.kyc.invoice.instruction'),
                  imageSource: BillEdf,
                  anotherInstruction: t('screens.kyc.invoice.another-instruction'),
                  docPickerVisible: true,
                  documentProperties: {
                    category: IDocumentCategory.RESIDENCE_PROOF,
                    typeId: IDocumentType.INVOICE,
                    name: 'residence-proof.invoice.recto',
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
                  instruction: t('screens.kyc.taxes.instruction'),
                  imageSource: Taxes,
                  docPickerVisible: true,
                  documentProperties: {
                    category: IDocumentCategory.RESIDENCE_PROOF,
                    typeId: IDocumentType.TAX_CERTIFICATE,
                    name: 'residence-proof.taxes.recto',
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
