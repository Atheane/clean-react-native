import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IDocumentType } from '@clean-rn/kyc/domain';
import {
  Colors,
  FontNames,
  IconTextItem,
  KycResidenceProof,
  KycInvoice,
  KycIdentification,
} from '@clean-rn/ui-mobile';
import { IKycStackPages, IRoutes } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

const HEIGHT = Dimensions.get('window').height;

export const HostedList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(
    (route: IRoutes, documentType?: IDocumentType) => {
      navigation.navigate(route as never, documentType ? { docType: documentType, step: 1 } : undefined);
    },
    [navigation],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={[styles.titleContainer]}>
            <Text style={[theme.bank.text.boldDarkBlue, styles.title]}>
              {t('screens.kyc.host-list.instruction')}
            </Text>
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycResidenceProof}
              text={t('screens.kyc.host-list.attestation')}
              onPress={() => handleOnPress(IKycStackPages.UPLOAD_DOCUMENT, IDocumentType.PROOF_OF_ADDRESS)}
            />
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycIdentification}
              text={t('screens.kyc.host-list.id')}
              onPress={() => handleOnPress(IKycStackPages.FIRST_ID_LIST)}
            />
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycInvoice}
              text={t('screens.kyc.host-list.residence-proof')}
              onPress={() => handleOnPress(IKycStackPages.RESIDENCE_PROOF_LIST)}
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
