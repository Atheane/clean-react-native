import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageSourcePropType, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import { KYC_REVIEW } from '@clean-rn/auth/domain';
import {
  IDocumentType,
  IDocumentCategory,
  KycDocuments,
  IDocumentStatus,
  IDocumentProperties,
  IDocumentStatusCode,
} from '@clean-rn/kyc/domain';
import {
  UploadDocumentCard,
  KycW9,
  KycIdentification,
  KycInvoice,
  KycSwornStatement,
} from '@clean-rn/ui-mobile';

import { IKycStackPages, IRoutes } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { initializeDocument, cancelUpload } from '../../application/commands/document';

import { W9, SwornStatement, PendingKyc } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

const renderLabel = (text: string) => {
  if (text.length > 90) {
    return `${text}`.slice(0, 90) + '...';
  }
  return text;
};

export const Kyc = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  // w9 or not ?
  const { user } = useSelector((state: IRootState) => state.auth.login);

  // navigation
  const navigation = useNavigation();

  const navigateTo = useCallback(
    (
      route: IRoutes,
      {
        instruction,
        imageSource,
        showExample,
        docPickerVisible,
        documentProperties,
      }: {
        instruction?: string;
        imageSource?: ImageSourcePropType;
        showExample?: boolean;
        docPickerVisible?: boolean;
        documentProperties?: IDocumentProperties;
      },
    ) => {
      if (documentProperties) {
        dispatch(initializeDocument({ documentProperties }));
      }
      navigation.navigate(
        route as never,
        documentProperties
          ? {
              instruction,
              imageSource,
              showExample,
              docPickerVisible,
            }
          : {},
      );
    },
    [navigation, dispatch],
  );

  const { customer } = useSelector((state: IRootState) => state.kyc.customer);
  const { document, pending } = useSelector((state: IRootState) => state.kyc.document);

  const [submittedKyc, setSubmittedKyc] = useState<KycDocuments>();

  useEffect(() => {
    if (customer?.properties.kyc) {
      setSubmittedKyc(customer.properties.kyc);
    }
  }, [customer?.properties.kyc, customer?.properties.kyc?.isHosted]);

  const handleOnCancel = useCallback(() => {
    dispatch(cancelUpload());
  }, [dispatch]);

  const Instructions = () => (
    <View
      style={[
        styles.messageContainer,
        submittedKyc?.expectedDocumentCount === 2 ? { marginTop: 80 } : { marginTop: 50 },
        submittedKyc?.expectedDocumentCount === 2 ? { marginBottom: 75 } : {},
      ]}
    >
      <Text style={[styles.title, theme.bank.text.darkBlue]}>{t('screens.kyc.menu.title')}</Text>
    </View>
  );

  const KycPending = () => (
    <View style={[styles.messageContainer, { marginTop: -120 }]}>
      <Image source={PendingKyc} style={{ width: 115, height: 115 }} />
      <Text style={[styles.instruction, theme.bank.text.grey]}>
        {t('screens.kyc.menu.instruction-after.begin')}
        <Text style={[styles.instruction, theme.bank.text.boldGrey]}>
          {t('screens.kyc.menu.instruction-after.bold')}
        </Text>
        {t('screens.kyc.menu.instruction-after.end')}
      </Text>
    </View>
  );

  const KycRefused = () => (
    <View style={[styles.messageContainer, { marginTop: 50 }]}>
      <Text style={[styles.title, theme.bank.text.darkBlue]}>{t('screens.kyc.menu.title')}</Text>
      <Text style={[theme.bank.text.errors, styles.errorMessage, { lineHeight: 15, fontSize: 12 }]}>
        {`${t('errors.domain-error.kyc.KYC_REFUSED')}. \n\n`}
        {customer?.properties.kycReviewComment
          ? `${renderLabel(customer.properties.kycReviewComment)}. \n\n`
          : ''}
        {`${t('screens.kyc.menu.fix-file')}. `}
      </Text>
    </View>
  );

  const hasErrorMessage = (documentCategory: IDocumentCategory) => {
    return (
      submittedKyc?.documents[documentCategory]?.properties.status === IDocumentStatus.REFUSED &&
      !!submittedKyc?.documents[documentCategory]?.properties.statusCode
    );
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          {customer?.properties.status === KYC_REVIEW.NONE && !customer?.properties.kyc?.isComplete && (
            <Instructions />
          )}
          {customer?.properties.kyc?.isComplete && <KycPending />}
          {customer?.properties.status === KYC_REVIEW.REFUSED && <KycRefused />}
          {!customer?.properties.kyc?.isComplete && user?.properties.USPerson && (
            <View style={styles.itemContainer}>
              <UploadDocumentCard
                icon={KycW9}
                status={submittedKyc?.documents.W9?.properties.status}
                text={t('screens.kyc.menu.w9-form')}
                onPress={() =>
                  navigateTo(IKycStackPages.UPLOAD_DOCUMENT as never, {
                    instruction: t('screens.kyc.w9.instruction'),
                    imageSource: W9,
                    docPickerVisible: true,
                    documentProperties: {
                      category: IDocumentCategory.W9,
                      typeId: IDocumentType.TAX_CERTIFICATE,
                      name: 'w9.form.recto',
                      status: IDocumentStatus.INIT,
                      statusCode: IDocumentStatusCode.INITIAL,
                      createdAt: new Date(),
                    },
                  })
                }
                loading={pending && document?.properties.category === IDocumentCategory.W9}
                onCancel={handleOnCancel}
                errorMessage={
                  hasErrorMessage(IDocumentCategory.W9)
                    ? t(`errors.domain-error.kyc.${submittedKyc?.documents.W9?.properties.statusCode}`)
                    : ''
                }
              />
            </View>
          )}
          {!customer?.properties.kyc?.isComplete && (
            <View style={styles.itemContainer}>
              <UploadDocumentCard
                icon={KycIdentification}
                status={submittedKyc?.documents.ID?.properties.status}
                text={t('screens.kyc.menu.identity')}
                onPress={() => navigateTo(IKycStackPages.ID_LIST as never, {})}
                loading={pending && document?.properties.category === IDocumentCategory.ID}
                onCancel={handleOnCancel}
                errorMessage={
                  hasErrorMessage(IDocumentCategory.ID)
                    ? t(`errors.domain-error.kyc.${submittedKyc?.documents.ID?.properties.statusCode}`)
                    : ''
                }
              />
            </View>
          )}
          {!customer?.properties.kyc?.isComplete && submittedKyc?.isHosted && (
            <View style={styles.itemContainer}>
              <UploadDocumentCard
                icon={KycSwornStatement}
                status={submittedKyc?.documents.RESIDENCE_PROOF_SWORN_STATEMENT?.properties.status}
                text={t('screens.kyc.menu.sworn-statement')}
                onPress={() =>
                  navigateTo(IKycStackPages.UPLOAD_DOCUMENT, {
                    instruction: t('screens.kyc.sworn-statement.instruction'),
                    imageSource: SwornStatement,
                    showExample: true,
                    docPickerVisible: false,
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
                loading={
                  pending &&
                  document?.properties.category === IDocumentCategory.RESIDENCE_PROOF_SWORN_STATEMENT
                }
                onCancel={handleOnCancel}
                errorMessage={
                  hasErrorMessage(IDocumentCategory.RESIDENCE_PROOF_SWORN_STATEMENT)
                    ? t(
                        `errors.domain-error.kyc.${submittedKyc?.documents.RESIDENCE_PROOF_SWORN_STATEMENT?.properties.statusCode}`,
                      )
                    : ''
                }
              />
            </View>
          )}
          {!customer?.properties.kyc?.isComplete && submittedKyc?.isHosted && (
            <View style={styles.itemContainer}>
              <UploadDocumentCard
                icon={KycIdentification}
                status={submittedKyc?.documents.RESIDENCE_PROOF_ID?.properties.status}
                text={t('screens.kyc.menu.host-id')}
                onPress={() => navigateTo(IKycStackPages.HOST_ID_LIST as never, {})}
                loading={pending && document?.properties.category === IDocumentCategory.RESIDENCE_PROOF_ID}
                onCancel={handleOnCancel}
                errorMessage={
                  hasErrorMessage(IDocumentCategory.RESIDENCE_PROOF_ID)
                    ? t(
                        `errors.domain-error.kyc.${submittedKyc?.documents.RESIDENCE_PROOF_ID?.properties.statusCode}`,
                      )
                    : ''
                }
              />
            </View>
          )}
          {!customer?.properties.kyc?.isComplete && (
            <View style={styles.itemContainer}>
              <UploadDocumentCard
                icon={KycInvoice}
                status={submittedKyc?.documents.RESIDENCE_PROOF?.properties.status}
                text={
                  submittedKyc?.isHosted
                    ? t('screens.kyc.menu.host-residence')
                    : t('screens.kyc.menu.address')
                }
                onPress={() =>
                  navigateTo(
                    submittedKyc?.isHosted
                      ? (IKycStackPages.HOST_RESIDENCE_PROOF_LIST as never)
                      : (IKycStackPages.RESIDENCE_PROOF_OPTIONS as never),
                    {},
                  )
                }
                loading={pending && document?.properties.category === IDocumentCategory.RESIDENCE_PROOF}
                onCancel={handleOnCancel}
                errorMessage={
                  hasErrorMessage(IDocumentCategory.RESIDENCE_PROOF)
                    ? t(
                        `errors.domain-error.kyc.${submittedKyc?.documents.RESIDENCE_PROOF?.properties.statusCode}`,
                      )
                    : ''
                }
              />
            </View>
          )}
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
  },
  title: {
    margin: 24,
  },
  instruction: {
    textAlign: 'justify',
    width: '80%',
    marginVertical: 24,
  },
  messageContainer: {
    alignItems: 'center',
    width: '100%',
  },
  errorMessage: {
    textAlign: 'left',
  },
  itemContainer: {},
});
