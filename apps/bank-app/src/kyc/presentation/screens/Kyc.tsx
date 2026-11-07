import { useCallback } from 'react';
import { View, Text, StyleSheet, ImageSourcePropType, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  IDocumentType,
  IStepTypes,
  IStepStatus,
  IDocumentStatusCode,
  IDocumentProperties,
} from '@clean-rn/kyc/domain';
import {
  UploadDocumentCard,
  KycW9,
  KycIdentification,
  Transfer,
  Colors,
  EuroCycle,
  LoaderSplashScreen,
} from '@clean-rn/ui-mobile';

import { IKycStackPages, IKycStackProps } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { W9, PendingKyc } from '../assets/images';
import { createDocument } from '../../application/commands';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { KYC_REVIEW } from '@clean-rn/user/domain';

type NavigationProp = NativeStackNavigationProp<IKycStackProps>;

const renderLabel = (text: string) => {
  if (text.length > 90) {
    return `${text}`.slice(0, 90) + '...';
  }
  return text;
};

export const KycInit = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <View style={[styles.messageContainer]}>
      <Text style={[theme.text.grey]}>{t('screens.kyc.kyc-init.instruction')}</Text>
    </View>
  );
};

const KycPending = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <View style={[styles.messageContainer]}>
      <Image source={PendingKyc} style={{ width: 115, height: 115 }} />
      <Text style={[styles.instruction, theme.text.grey]}>
        {t('screens.kyc.menu.instruction-after.begin')}
        <Text style={[styles.instruction, theme.text.boldGrey]}>
          {t('screens.kyc.menu.instruction-after.bold')}
        </Text>
        {t('screens.kyc.menu.instruction-after.end')}
      </Text>
    </View>
  );
};

const KycRefused = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { customer } = useSelector((state: IRootState) => state.customer);
  return (
    <View style={[styles.messageContainer]}>
      <Text style={[theme.text.errors, styles.errorMessage, { lineHeight: 18, fontSize: 14 }]}>
        {`${t('errors.domain-error.kyc.KYC_REFUSED')}. \n\n`}
        {customer?.properties.reviewComment ? `${renderLabel(customer.properties.reviewComment)}. \n\n` : ''}
        {`${t('screens.kyc.menu.fix-file')}. `}
      </Text>
    </View>
  );
};

const Instructions = () => {
  const { customer } = useSelector((state: IRootState) => state.customer);
  if (customer?.properties?.status === undefined) {
    return <LoaderSplashScreen />;
  }
  switch (customer.properties.status) {
    case KYC_REVIEW.PENDING:
      return <KycPending />;
    case KYC_REVIEW.REFUSED:
      return <KycRefused />;
    default:
      return <KycInit />;
  }
};

export const Kyc = () => {
  const { t } = useTranslation();
  const { customer, pending } = useSelector((state: IRootState) => state.customer);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const navigateTo = useCallback(
    (
      route: keyof IKycStackProps,
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
        dispatch(createDocument({ documentProperties }));
      }
      navigation.navigate(
        route,
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
  if (!customer?.properties?.steps) {
    return <LoaderSplashScreen />;
  }

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container]}>
          <Instructions />
          <View style={styles.itemContainer}>
            <UploadDocumentCard
              icon={() => <KycIdentification style={{ marginRight: -20 }} />}
              status={customer.properties.steps[IStepTypes.ID]}
              text={t('screens.kyc.kyc-init.identity')}
              onPress={() => navigateTo(IKycStackPages.ID_LIST as never, {})}
              loading={pending}
              onCancel={() => {
                return;
              }}
              errorMessage={''}
            />
          </View>
          <View style={styles.itemContainer}>
            <UploadDocumentCard
              icon={() => <EuroCycle style={{ marginRight: -26 }} />}
              status={customer.properties.steps[IStepTypes.INFORMATIONS]}
              text={t('screens.kyc.kyc-init.informations')}
              onPress={() => navigateTo(IKycStackPages.INFORMATIONS as never, {})}
              loading={false}
              onCancel={() => {
                return;
              }}
              errorMessage={''}
            />
          </View>
          <View style={styles.itemContainer}>
            <UploadDocumentCard
              icon={() => (
                <Transfer
                  startColor={Colors.secondary.pink}
                  endColor={Colors.primary.darkBlue}
                  style={{ marginRight: -20 }}
                />
              )}
              status={customer.properties.steps[IStepTypes.SCT]}
              text={t('screens.kyc.kyc-init.transfer')}
              onPress={() => navigateTo(IKycStackPages.SCT_REQUIRED as never, {})}
              loading={false}
              onCancel={() => {
                return;
              }}
              errorMessage={''}
            />
          </View>
          {customer?.properties.USPerson && (
            <View style={styles.itemContainer}>
              <UploadDocumentCard
                icon={() => <KycW9 style={{ marginRight: -12 }} />}
                status={customer.properties.steps[IStepTypes.W9]}
                text={t('screens.kyc.kyc-init.w9')}
                onPress={() =>
                  navigateTo(IKycStackPages.UPLOAD_DOCUMENT as never, {
                    instruction: t('screens.kyc.w9.instruction'),
                    imageSource: W9,
                    docPickerVisible: true,
                    documentProperties: {
                      context: IStepTypes.W9,
                      typeId: IDocumentType.TAX_CERTIFICATE,
                      name: 'w9.form.recto',
                      status: IStepStatus.INIT,
                      statusCode: IDocumentStatusCode.INITIAL,
                      createdAt: new Date(),
                    },
                  })
                }
                loading={pending}
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
    marginBottom: 200,
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
  itemContainer: {
    marginTop: 0,
  },
  errorMessage: {
    textAlign: 'left',
  },
});
