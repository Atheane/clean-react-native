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
} from '@clean-rn/kyc/domain';
import { UploadDocumentCard, KycW9, KycIdentification, KycPassport, KycInvoice } from '@clean-rn/ui-mobile';

import { IKycStackPages, IRoutes } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

import { initializeDocument, cancelUpload } from '../../application/commands/document';

import { W9, SwornStatement } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const MenuKyc = () => {
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
        dispatch(
          initializeDocument({
            documentProperties: {
              category: IDocumentCategory.W9,
              typeId: IDocumentType.TAX_CERTIFICATE,
              name: 'w9.form.recto',
              status: IDocumentStatus.INIT,
              createdAt: new Date(),
            },
          }),
        );
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
    [navigation],
  );

  const { customer } = useSelector((state: IRootState) => state.kyc.customer);
  const { document, pending } = useSelector((state: IRootState) => state.kyc.document);

  const [submittedKyc, setSubmittedKyc] = useState<KycDocuments>();

  useEffect(() => {
    if (customer?.properties.kyc) {
      // console.log('customer?.properties.kyc', customer?.properties.kyc.isComplete);
      setSubmittedKyc(customer.properties.kyc);
    }
  }, [customer?.properties.kyc]);

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
                      createdAt: new Date(),
                    },
                  })
                }
                loading={pending && document?.properties.category === IDocumentCategory.W9}
                onCancel={handleOnCancel}
              />
            </View>
          )}
          <View
            style={submittedKyc?.expectedDocumentCount === 3 ? styles.itemContainer3 : styles.itemContainer4}
          >
            <UploadDocumentCard
              icon={KycIdentification}
              status={submittedKyc?.documents.FIRST_ID?.properties.status}
              text={`${t('screens.kyc.menu.first')} ${t('screens.kyc.menu.identity')}`}
              onPress={() => navigateTo(IKycStackPages.FIRST_ID_LIST as never, {})}
              loading={pending && document?.properties.category === IDocumentCategory.FIRST_ID}
              onCancel={handleOnCancel}
            />
          </View>
          <View
            style={submittedKyc?.expectedDocumentCount === 3 ? styles.itemContainer3 : styles.itemContainer4}
          >
            <UploadDocumentCard
              icon={KycPassport}
              status={submittedKyc?.documents.SECOND_ID?.properties.status}
              text={`${t('screens.kyc.menu.second')} ${t('screens.kyc.menu.identity')}`}
              onPress={() => navigateTo(IKycStackPages.SECOND_ID_LIST as never, {})}
              loading={pending && document?.properties.category === IDocumentCategory.SECOND_ID}
              onCancel={handleOnCancel}
            />
          </View>
          <View
            style={submittedKyc?.expectedDocumentCount === 3 ? styles.itemContainer3 : styles.itemContainer4}
          >
            <UploadDocumentCard
              icon={KycInvoice}
              status={submittedKyc?.documents.RESIDENCE_PROOF?.properties.status}
              text={t('screens.kyc.menu.address')}
              onPress={() => navigateTo(IKycStackPages.RESIDENCE_PROOF_OPTIONS as never, {})}
              loading={pending && document?.properties.category === IDocumentCategory.RESIDENCE_PROOF}
              onCancel={handleOnCancel}
            />
          </View>
          {submittedKyc?.isHosted && (
            <View
              style={
                submittedKyc?.expectedDocumentCount === 3 ? styles.itemContainer3 : styles.itemContainer4
              }
            >
              <UploadDocumentCard
                icon={KycInvoice}
                status={submittedKyc?.documents.RESIDENCE_PROOF_FIRST_ID?.properties.status}
                text={t('screens.kyc.menu.host-id')}
                onPress={() => navigateTo(IKycStackPages.HOST_ID_LIST as never, {})}
                loading={
                  pending && document?.properties.category === IDocumentCategory.RESIDENCE_PROOF_FIRST_ID
                }
                onCancel={handleOnCancel}
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
                icon={SwornStatement}
                status={submittedKyc?.documents.RESIDENCE_PROOF_SWORN_STATEMENT?.properties.status}
                text={t('screens.kyc.menu.host-residence')}
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
                    },
                  })
                }
                loading={
                  pending &&
                  document?.properties.category === IDocumentCategory.RESIDENCE_PROOF_SWORN_STATEMENT
                }
                onCancel={handleOnCancel}
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
});
