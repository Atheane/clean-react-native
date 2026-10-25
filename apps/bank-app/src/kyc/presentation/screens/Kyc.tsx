import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';

import {
  IDocumentType,
  IKycSteps,
  KycSteps,
  IDocumentStatus,
  IDocumentProperties,
  IDocumentStatusCode,
  IKycState,
  DocumentVO,
} from '@clean-rn/kyc/domain';
import { UploadDocumentCard, KycW9, KycIdentification, TransferBlueGradient } from '@clean-rn/ui-mobile';

import { IKycStackPages, IRoutes } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { initializeDocument, cancelUpload } from '../../application/commands/document';

import { W9, PendingKyc } from '../assets/images';

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

  const [submittedKyc, setSubmittedKyc] = useState<KycSteps>();
  const [documentsCount, setDocumentsCount] = useState(1);

  useEffect(() => {
    if (customer?.properties.kyc) {
      const documentsCount = customer.properties.kyc.stepsCount - 1;
      setDocumentsCount(documentsCount);
    }
  }, [customer]);

  useEffect(() => {
    if (customer?.properties.kyc) {
      setSubmittedKyc(customer.properties.kyc);
    }
  }, [customer?.properties.kyc]);

  const handleOnCancel = useCallback(() => {
    dispatch(cancelUpload());
  }, [dispatch]);

  const Instructions = () => (
    <View style={[styles.messageContainer]}>
      <Text style={[theme.bank.text.grey]}>
        {documentsCount === 1
          ? t('screens.kyc.menu.instruction-before.singular')
          : t('screens.kyc.menu.instruction-before.plural')}
      </Text>
    </View>
  );

  const KycPending = () => (
    <View style={[styles.messageContainer]}>
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
    <View style={[styles.messageContainer]}>
      <Text style={[theme.bank.text.errors, styles.errorMessage, { lineHeight: 18, fontSize: 14 }]}>
        {`${t('errors.domain-error.kyc.KYC_REFUSED')}. \n\n`}
        {customer?.properties.kycReviewComment
          ? `${renderLabel(customer.properties.kycReviewComment)}. \n\n`
          : ''}
        {`${t('screens.kyc.menu.fix-file')}. `}
      </Text>
    </View>
  );

  const hasErrorMessage = (documentCategory: IKycSteps.ID | IKycSteps.W9) => {
    return (
      submittedKyc &&
      submittedKyc.steps[documentCategory] instanceof DocumentVO &&
      submittedKyc.steps[documentCategory].properties.status === IDocumentStatus.REFUSED &&
      !!submittedKyc.steps[documentCategory].properties.statusCode
    );
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, theme.bank.container.centeredItem]}>
          {(customer?.properties.kyc?.state === IKycState.INIT ||
            customer?.properties.kyc?.state === IKycState.INCOMPLETE) && <Instructions />}
          {customer?.properties.kyc?.state === IKycState.PENDING && <KycPending />}
          {customer?.properties.kyc?.state === IKycState.REFUSED && <KycRefused />}
          {customer?.properties.kyc?.state !== IKycState.PENDING && customer?.properties.kyc?.isUSPerson && (
            <View style={styles.itemContainer}>
              <UploadDocumentCard
                icon={KycW9}
                status={
                  submittedKyc?.steps.W9 instanceof DocumentVO
                    ? submittedKyc.steps.W9.properties.status
                    : IDocumentStatus.INIT
                }
                text={t('screens.kyc.menu.w9-form')}
                onPress={() =>
                  navigateTo(IKycStackPages.UPLOAD_DOCUMENT as never, {
                    instruction: t('screens.kyc.w9.instruction'),
                    imageSource: W9,
                    docPickerVisible: true,
                    documentProperties: {
                      kycStep: IKycSteps.W9,
                      typeId: IDocumentType.TAX_CERTIFICATE,
                      name: 'w9.form.recto',
                      status: IDocumentStatus.INIT,
                      statusCode: IDocumentStatusCode.INITIAL,
                      createdAt: new Date(),
                    },
                  })
                }
                loading={pending && document?.properties.kycStep === IKycSteps.W9}
                onCancel={handleOnCancel}
                errorMessage={
                  hasErrorMessage(IKycSteps.W9) && submittedKyc?.steps.W9 instanceof DocumentVO
                    ? t(`errors.domain-error.kyc.${submittedKyc.steps.W9.properties.statusCode}`)
                    : ''
                }
              />
            </View>
          )}
          {customer?.properties.kyc?.state !== IKycState.PENDING && (
            <View style={styles.itemContainer}>
              <UploadDocumentCard
                icon={KycIdentification}
                status={
                  submittedKyc?.steps.ID instanceof DocumentVO
                    ? submittedKyc.steps.ID.properties.status
                    : IDocumentStatus.INIT
                }
                text={t('screens.kyc.menu.identity')}
                onPress={() => navigateTo(IKycStackPages.ID_LIST as never, {})}
                loading={pending && document?.properties.kycStep === IKycSteps.ID}
                onCancel={handleOnCancel}
                errorMessage={
                  hasErrorMessage(IKycSteps.ID) && submittedKyc?.steps.ID instanceof DocumentVO
                    ? t(`errors.domain-error.kyc.${submittedKyc.steps.ID.properties.statusCode}`)
                    : ''
                }
              />
            </View>
          )}
          {customer?.properties.kyc?.state !== IKycState.PENDING && (
            <View style={styles.itemContainer}>
              <UploadDocumentCard
                icon={TransferBlueGradient}
                status={
                  customer?.properties.kyc?.steps.SCT ? IDocumentStatus.VALIDATED : IDocumentStatus.INIT
                }
                text={t('screens.kyc.menu.transfer')}
                onPress={() => navigateTo(IKycStackPages.SCT_REQUIRED as never, {})}
                loading={false}
                onCancel={() => {
                  return;
                }}
                errorMessage={''}
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
    marginTop: 150,
    marginBottom: 300,
  },
  title: {
    margin: 60,
  },
  instruction: {
    textAlign: 'justify',
    width: '80%',
    marginVertical: 24,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  errorMessage: {
    textAlign: 'left',
  },
  itemContainer: {
    marginTop: 0,
  },
});
