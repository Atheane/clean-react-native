import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import {
  IDocumentType,
  IDocumentCategory,
  IDocumentStatus,
  IDocumentProperties,
  IDocumentStatusCode,
} from '@clean-rn/kyc/domain';
import { IconTextItem, KycInvoice, KycIdentification, KycSwornStatement } from '@clean-rn/ui-mobile';
import { IKycStackPages, IRoutes } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { initializeDocument } from '../../application/commands/document';
import { SwornStatement } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const KycHost = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const handleOnPress = useCallback(
    (
      route: IRoutes,
      {
        instruction,
        imageSource,
        showExample,
        documentProperties,
      }: {
        instruction?: string;
        imageSource?: ImageSourcePropType;
        showExample?: boolean;
        documentProperties?: IDocumentProperties;
      } = {},
    ) => {
      if (documentProperties) {
        dispatch(
          initializeDocument({
            documentProperties,
          }),
        );
      }
      navigation.navigate(
        route as never,
        route === IKycStackPages.UPLOAD_DOCUMENT ? { instruction, imageSource, showExample } : {},
      );
    },
    [navigation, dispatch],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={[styles.instructionContainer]}>
            <Text style={[theme.bank.text.boldDarkBlue, styles.instruction]}>
              {t('screens.kyc.menu-kyc-host.instruction')}
            </Text>
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycSwornStatement}
              text={t('screens.kyc.menu-kyc-host.sworn-statement')}
              onPress={() =>
                handleOnPress(IKycStackPages.UPLOAD_DOCUMENT, {
                  instruction: t('screens.kyc.sworn-statement.instruction'),
                  imageSource: SwornStatement,
                  showExample: true,
                  documentProperties: {
                    category: IDocumentCategory.RESIDENCE_PROOF_SWORN_STATEMENT,
                    typeId: IDocumentType.SWORN_STATEMENT,
                    name: 'residence-proof.sworn-statement.recto',
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
              icon={KycIdentification}
              text={t('screens.kyc.menu-kyc-host.identification')}
              onPress={() => handleOnPress(IKycStackPages.HOST_ID_LIST, {})}
            />
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycInvoice}
              text={t('screens.kyc.menu-kyc-host.residence-proof')}
              onPress={() => handleOnPress(IKycStackPages.HOST_RESIDENCE_PROOF_LIST, {})}
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
