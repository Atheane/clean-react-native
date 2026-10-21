import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { UploadDocumentCard, KycW9, KycIdentification, KycPassport, KycInvoice } from '@clean-rn/ui-mobile';
import { IDocumentType, IDocumentCategory, KycDocuments } from '@clean-rn/kyc/domain';

import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { cancelUpload } from '../../../kyc/application/commands/document';

const HEIGHT = Dimensions.get('window').height;

export const MenuKyc = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // w9 or not ?
  const { user } = useSelector((state: IRootState) => state.auth.login);
  const documentsNumber = user?.properties.USPerson ? 4 : 3;

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
    () => navigation.navigate(IKycStackPages.RESIDENCE_PROOF_OPTIONS as never),
    [navigation],
  );

  const { customer } = useSelector((state: IRootState) => state.kyc.customer);
  const { document, pending } = useSelector((state: IRootState) => state.kyc.document);

  const [submittedKyc, setSubmittedKyc] = useState<KycDocuments>();

  useEffect(() => {
    if (customer?.properties.kyc) {
      setSubmittedKyc(customer.properties.kyc);
    }
  }, [customer?.properties.kyc]);

  const dispatch = useDispatch();

  const handleOnCancel = useCallback(() => {
    dispatch(cancelUpload());
  }, [dispatch]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Text style={[styles.title, theme.bank.text.darkBlue]}>{t('screens.kyc.menu.title')}</Text>
          <Text style={[styles.instruction, theme.bank.text.grey]}>{`${t(
            'screens.kyc.menu.instruction-before.begin',
          )} ${documentsNumber} ${t('screens.kyc.menu.instruction-before.end')}`}</Text>
          {user?.properties.USPerson && (
            <View style={styles.itemContainer}>
              <UploadDocumentCard
                icon={KycW9}
                status={submittedKyc?.documents.W9?.properties.status}
                text={t('screens.kyc.menu.w9-form')}
                onPress={navigateToUploadW9}
                loading={pending && document?.properties.category === IDocumentCategory.W9}
                onCancel={handleOnCancel}
              />
            </View>
          )}
          <View style={styles.itemContainer}>
            <UploadDocumentCard
              icon={KycIdentification}
              status={submittedKyc?.documents.FIRST_ID?.properties.status}
              text={`${t('screens.kyc.menu.first')} ${t('screens.kyc.menu.identity')}`}
              onPress={navigateToFirstIdList}
              loading={pending && document?.properties.category === IDocumentCategory.FIRST_ID}
              onCancel={handleOnCancel}
            />
          </View>
          <View style={styles.itemContainer}>
            <UploadDocumentCard
              icon={KycPassport}
              status={submittedKyc?.documents.SECOND_ID?.properties.status}
              text={`${t('screens.kyc.menu.second')} ${t('screens.kyc.menu.identity')}`}
              onPress={navigateToSecondIdList}
              loading={pending && document?.properties.category === IDocumentCategory.SECOND_ID}
              onCancel={handleOnCancel}
            />
          </View>
          <View style={styles.itemContainer}>
            <UploadDocumentCard
              icon={KycInvoice}
              status={submittedKyc?.documents.RESIDENCE_PROOF?.properties.status}
              text={t('screens.kyc.menu.address')}
              onPress={navigateToResidenceProofIdList}
              loading={pending && document?.properties.category === IDocumentCategory.RESIDENCE_PROOF}
              onCancel={handleOnCancel}
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
  itemContainer: {
    marginVertical: 16,
  },
  instruction: {
    textAlign: 'justify',
    width: '80%',
    marginVertical: 24,
  },
});
