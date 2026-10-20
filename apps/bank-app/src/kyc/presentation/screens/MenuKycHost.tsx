import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IconTextItem, KycResidenceProof, KycInvoice, KycIdentification } from '@clean-rn/ui-mobile';
import { IKycStackPages, IRoutes } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { SwornStatement } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const MenuKycHost = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(
    (
      route: IRoutes,
      {
        instruction,
        imageSource,
        showExample,
      }: { instruction?: string; imageSource?: ImageSourcePropType; showExample?: boolean } = {},
    ) => {
      navigation.navigate(
        route as never,
        route === IKycStackPages.UPLOAD_DOCUMENT ? { instruction, imageSource, showExample } : {},
      );
    },
    [navigation],
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
              icon={KycResidenceProof}
              text={t('screens.kyc.menu-kyc-host.sworn-statement')}
              onPress={() =>
                handleOnPress(IKycStackPages.UPLOAD_DOCUMENT, {
                  instruction: t('screens.kyc.sworn-statement.instruction'),
                  imageSource: SwornStatement,
                  showExample: true,
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
