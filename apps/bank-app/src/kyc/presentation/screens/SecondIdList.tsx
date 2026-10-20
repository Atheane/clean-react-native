import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import {
  Colors,
  FontNames,
  IconTextItem,
  KycId,
  KycPassport,
  KycResidencePermit,
  KycDrivingLicense,
  KycHealthCard,
} from '@clean-rn/ui-mobile';
import {
  IDocumentCategory,
  IDocumentType,
  IDocumentProperties,
  IDocumentStatus,
} from '@clean-rn/kyc/domain';
import {
  DrivingLicenseRecto,
  DrivingLicenseVerso,
  HealthThumb,
  IDCardRecto,
  IDCardVerso,
  Passport,
  ResidencePermitRecto,
  ResidencePermitVerso,
} from '../assets/images';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { initializeDocument } from '../../../kyc/application/commands/document';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';

const HEIGHT = Dimensions.get('window').height;

export const SecondIdList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const handleOnPress = useCallback(
    ({
      instruction,
      imageSource,
      documentProperties,
      nextRouteParams,
      secondImageVisible,
    }: {
      instruction: string;
      imageSource: ImageSourcePropType;
      documentProperties: IDocumentProperties;
      secondImageVisible?: boolean;
      nextRouteParams?: {
        instruction: string;
        imageSource: ImageSourcePropType;
      };
    }) => {
      dispatch(initializeDocument({ documentProperties }));
      navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT as never, {
        instruction,
        imageSource,
        nextRouteParams,
        secondImageVisible,
      });
    },
    [navigation, dispatch],
  );

  const { customer } = useSelector((state: IRootState) => state.kyc.customer);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT * 0.9 }]}>
          <View style={[styles.titleContainer]}>
            <Text style={[theme.bank.text.boldDarkBlue, styles.title]}>
              {t('screens.kyc.second-id.instruction')}
            </Text>
          </View>

          <View>
            <View style={[styles.itemContainer]}>
              <IconTextItem
                icon={KycId}
                text={t('screens.kyc.second-id.id')}
                validated={
                  customer?.properties?.kyc?.documents.SECOND_ID?.properties?.typeId === IDocumentType.ID
                }
                onPress={() =>
                  handleOnPress({
                    instruction: t('screens.kyc.id.recto.instruction'),
                    imageSource: IDCardRecto,
                    documentProperties: {
                      category: IDocumentCategory.SECOND_ID,
                      typeId: IDocumentType.ID,
                      name: 'second-id.id.recto',
                      status: IDocumentStatus.INIT,
                      createdAt: new Date(),
                    },
                    nextRouteParams: {
                      instruction: t('screens.kyc.id.verso.instruction'),
                      imageSource: IDCardVerso,
                    },
                  })
                }
              />
            </View>
            <View style={[styles.itemContainer]}>
              <IconTextItem
                icon={KycPassport}
                text={t('screens.kyc.second-id.passport')}
                validated={
                  customer?.properties?.kyc?.documents.SECOND_ID?.properties?.typeId ===
                  IDocumentType.PASSPORT
                }
                onPress={() =>
                  handleOnPress({
                    instruction: t('screens.kyc.passport.instruction'),
                    imageSource: Passport,
                    documentProperties: {
                      category: IDocumentCategory.SECOND_ID,
                      typeId: IDocumentType.PASSPORT,
                      name: 'second-id.passport.recto',
                      status: IDocumentStatus.INIT,
                      createdAt: new Date(),
                    },
                  })
                }
              />
            </View>
            <View style={styles.itemContainer}>
              <IconTextItem
                icon={KycResidencePermit}
                text={t('screens.kyc.second-id.residence-permit')}
                validated={
                  customer?.properties?.kyc?.documents.SECOND_ID?.properties?.typeId ===
                  IDocumentType.RESIDENT_PERMIT
                }
                onPress={() =>
                  handleOnPress({
                    instruction: t('screens.kyc.residence-permit.recto.instruction'),
                    imageSource: ResidencePermitRecto,
                    documentProperties: {
                      category: IDocumentCategory.SECOND_ID,
                      typeId: IDocumentType.RESIDENT_PERMIT,
                      name: 'second-id.residence-permit.recto',
                      status: IDocumentStatus.INIT,
                      createdAt: new Date(),
                    },
                    nextRouteParams: {
                      instruction: t('screens.kyc.residence-permit.verso.instruction'),
                      imageSource: ResidencePermitVerso,
                    },
                  })
                }
              />
            </View>
            <View style={styles.itemContainer}>
              <IconTextItem
                icon={KycDrivingLicense}
                text={t('screens.kyc.second-id.driving-license')}
                validated={
                  customer?.properties?.kyc?.documents.SECOND_ID?.properties?.typeId ===
                  IDocumentType.DRIVING_LICENSE
                }
                onPress={() =>
                  handleOnPress({
                    instruction: t('screens.kyc.driving-license.recto.instruction'),
                    imageSource: DrivingLicenseRecto,
                    documentProperties: {
                      category: IDocumentCategory.SECOND_ID,
                      typeId: IDocumentType.DRIVING_LICENSE,
                      name: 'second-id.driving-license.recto',
                      status: IDocumentStatus.INIT,
                      createdAt: new Date(),
                    },
                    nextRouteParams: {
                      instruction: t('screens.kyc.driving-license.verso.instruction'),
                      imageSource: DrivingLicenseVerso,
                    },
                  })
                }
              />
            </View>
            <View style={styles.itemContainer}>
              <IconTextItem
                icon={KycHealthCard}
                text={t('screens.kyc.second-id.health-card')}
                validated={
                  customer?.properties?.kyc?.documents.SECOND_ID?.properties?.typeId ===
                  IDocumentType.HEALTH_INSURANCE_CARD
                }
                onPress={() =>
                  handleOnPress({
                    instruction: t('screens.kyc.health-card.instruction'),
                    imageSource: HealthThumb,
                    secondImageVisible: true,
                    documentProperties: {
                      category: IDocumentCategory.SECOND_ID,
                      typeId: IDocumentType.HEALTH_INSURANCE_CARD,
                      name: 'second-id.health-card.recto',
                      status: IDocumentStatus.INIT,
                      createdAt: new Date(),
                    },
                  })
                }
              />
            </View>
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
    marginTop: 80,
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
  titleContainer: {
    marginBottom: 50,
    width: '90%',
  },
  itemContainer: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
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
