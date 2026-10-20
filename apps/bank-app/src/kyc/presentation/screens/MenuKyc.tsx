import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  UploadDocumentCard,
  KycW9,
  KycW9Disabled,
  KycIdentification,
  KycIdentificationDisabled,
  KycPassport,
  KycPassportDisabled,
  KycInvoice,
  KycInvoiceDisabled,
} from '@clean-rn/ui-mobile';
import { IDocumentType, KycDocuments } from '@clean-rn/kyc/domain';

import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const HEIGHT = Dimensions.get('window').height;

export const MenuKyc = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // w9 or not ?
  const { user } = useSelector((state: IRootState) => state.auth.login);
  const documentsNumber = user?.properties.USPerson ? 5 : 4;

  // navigation
  const navigation = useNavigation();

  const navigateToUploadW9 = useCallback(() => {
    navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT, {
      documentType: IDocumentType.TAX_CERTIFICATE,
    });
  }, [navigation]);

  const navigateToFirstIdList = useCallback(
    () => navigation.navigate(IKycStackPages.FIRST_ID_LIST as never),
    [navigation],
  );

  const navigateToSecondIdList = useCallback(
    () => navigation.navigate(IKycStackPages.SECOND_ID_LIST as never),
    [navigation],
  );

  const navigateToResidenceProofIdList = useCallback(
    () => navigation.navigate(IKycStackPages.OWNED_RESIDENCE_PROOF_LIST as never),
    [navigation],
  );

  // docuemnts status
  const { customer } = useSelector((state: IRootState) => state.kyc);

  const [submittedDocuments, setSubmittedDocuments] = useState<KycDocuments>();

  useEffect(() => {
    if (customer?.properties.documents) {
      setSubmittedDocuments(customer.properties.documents);
    }
  }, [customer?.properties.documents]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Text style={[styles.title, theme.bank.text.darkBlue]}>{t('screens.kyc.menu.title')}</Text>
          <Text style={[styles.instruction, theme.bank.text.grey]}>{`${t(
            'screens.kyc.menu.instruction-before.begin',
          )} ${documentsNumber} ${t('screens.kyc.menu.instruction-before.end')}`}</Text>
          <View>
            {user?.properties.USPerson && (
              <UploadDocumentCard
                icon={KycW9}
                iconDisabled={KycW9Disabled}
                status={submittedDocuments?.w9?.status}
                text={t('screens.kyc.menu.w9-form')}
                onPress={navigateToUploadW9}
              />
            )}
            <UploadDocumentCard
              icon={KycIdentification}
              iconDisabled={KycIdentificationDisabled}
              status={submittedDocuments?.firstId?.status}
              text={`${t('screens.kyc.menu.first')} ${t('screens.kyc.menu.identity')}`}
              onPress={navigateToFirstIdList}
            />
            <UploadDocumentCard
              icon={KycPassport}
              iconDisabled={KycPassportDisabled}
              status={submittedDocuments?.secondId?.status}
              text={`${t('screens.kyc.menu.second')} ${t('screens.kyc.menu.identity')}`}
              onPress={navigateToSecondIdList}
            />
            <UploadDocumentCard
              icon={KycInvoice}
              iconDisabled={KycInvoiceDisabled}
              status={submittedDocuments?.residenceProof?.status}
              text={t('screens.kyc.menu.address')}
              onPress={navigateToResidenceProofIdList}
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
    marginTop: 24,
    alignItems: 'center',
  },
  title: {
    margin: 24,
  },
  instruction: {
    textAlign: 'justify',
    width: '80%',
    marginVertical: 24,
  },
});
