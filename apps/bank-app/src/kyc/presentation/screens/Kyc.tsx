import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

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

import { W9, SwornStatement } from '../assets/images';
import { KYC_REVIEW } from '@clean-rn/auth/domain';

const HEIGHT = Dimensions.get('window').height;

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

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT * 1.1 }]}>
          <Text style={[styles.title, theme.bank.text.darkBlue]}>{t('screens.kyc.menu.title')}</Text>
          <Text style={[styles.instruction, theme.bank.text.grey]}>{`${t(
            'screens.kyc.menu.instruction-before.begin',
          )} ${submittedKyc?.expectedDocumentCount} ${t('screens.kyc.menu.instruction-before.end')}`}</Text>
          {customer?.properties.status === KYC_REVIEW.REFUSED && (
            <View style={styles.errorMessageContainer}>
              <Text style={[theme.bank.text.errors, styles.errorMessage]}>
                {`${t('errors.domain-error.kyc.KYC_REFUSED')}. `}
                {customer?.properties.kycReviewComment ? `${customer.properties.kycReviewComment}. ` : ''}
                {`${t('screens.kyc.menu.fix-file')}. `}
              </Text>
            </View>
          )}
          {user?.properties.USPerson && (
            <View
              style={
                submittedKyc?.expectedDocumentCount === 3 ? styles.itemContainer3 : styles.itemContainer4
              }
            >
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
                  submittedKyc?.documents.W9?.properties.status === IDocumentStatus.REFUSED
                    ? t(`errors.domain-error.kyc.${submittedKyc?.documents.W9?.properties.statusCode}`)
                    : ''
                }
              />
            </View>
          )}
          <View
            style={submittedKyc?.expectedDocumentCount === 3 ? styles.itemContainer3 : styles.itemContainer4}
          >
            <UploadDocumentCard
              icon={KycIdentification}
              status={submittedKyc?.documents.ID?.properties.status}
              text={t('screens.kyc.menu.identity')}
              onPress={() => navigateTo(IKycStackPages.ID_LIST as never, {})}
              loading={pending && document?.properties.category === IDocumentCategory.ID}
              onCancel={handleOnCancel}
              errorMessage={
                submittedKyc?.documents.ID?.properties.status === IDocumentStatus.REFUSED
                  ? t(`errors.domain-error.kyc.${submittedKyc?.documents.ID?.properties.statusCode}`)
                  : ''
              }
            />
          </View>
          <View
            style={submittedKyc?.expectedDocumentCount === 3 ? styles.itemContainer3 : styles.itemContainer4}
          >
            <UploadDocumentCard
              icon={KycInvoice}
              status={submittedKyc?.documents.RESIDENCE_PROOF?.properties.status}
              text={t('screens.kyc.menu.address')}
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
                submittedKyc?.documents.RESIDENCE_PROOF?.properties.status === IDocumentStatus.REFUSED
                  ? t(
                      `errors.domain-error.kyc.${submittedKyc?.documents.RESIDENCE_PROOF?.properties.statusCode}`,
                    )
                  : ''
              }
            />
          </View>
          {submittedKyc?.isHosted && (
            <View
              style={
                submittedKyc?.expectedDocumentCount === 3 ? styles.itemContainer3 : styles.itemContainer4
              }
            >
              <UploadDocumentCard
                icon={KycIdentification}
                status={submittedKyc?.documents.RESIDENCE_PROOF_ID?.properties.status}
                text={t('screens.kyc.menu.host-id')}
                onPress={() => navigateTo(IKycStackPages.HOST_ID_LIST as never, {})}
                loading={pending && document?.properties.category === IDocumentCategory.RESIDENCE_PROOF_ID}
                onCancel={handleOnCancel}
                errorMessage={
                  submittedKyc?.documents.RESIDENCE_PROOF_ID?.properties.status === IDocumentStatus.REFUSED
                    ? t(
                        `errors.domain-error.kyc.${submittedKyc?.documents.RESIDENCE_PROOF_ID?.properties.statusCode}`,
                      )
                    : ''
                }
              />
            </View>
          )}
          {submittedKyc?.isHosted && (
            <View
              style={
                submittedKyc?.expectedDocumentCount === 3 ? styles.itemContainer3 : styles.itemContainer4
              }
            >
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
                  submittedKyc?.documents.RESIDENCE_PROOF_SWORN_STATEMENT?.properties.status ===
                  IDocumentStatus.REFUSED
                    ? t(
                        `errors.domain-error.kyc.${submittedKyc?.documents.RESIDENCE_PROOF_SWORN_STATEMENT?.properties.statusCode}`,
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
    marginTop: 24,
    alignItems: 'center',
  },
  title: {
    margin: 24,
  },
  itemContainer3: {
    marginVertical: 16,
  },
  itemContainer4: {
    marginVertical: 6,
  },
  instruction: {
    textAlign: 'justify',
    width: '80%',
    marginVertical: 24,
  },
  errorMessageContainer: {
    marginVertical: 6,
    alignItems: 'center',
    width: '85%',
  },
  errorMessage: {
    textAlign: 'left',
  },
});
