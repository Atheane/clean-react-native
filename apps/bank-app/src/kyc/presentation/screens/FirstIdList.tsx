import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IconTextItem, KycId, KycPassport, KycResidencePermit } from '@clean-rn/ui-mobile';
import {
  IDocumentCategory,
  IDocumentType,
  IDocumentProperties,
  IDocumentStatus,
} from '@clean-rn/kyc/domain';

import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import {
  IDCardRecto,
  IDCardVerso,
  Passport,
  ResidencePermitRecto,
  ResidencePermitVerso,
} from '../assets/images';
import { initializeDocument } from '../../../kyc/application/commands/document';

const HEIGHT = Dimensions.get('window').height;

export const FirstIdList = () => {
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
    }: {
      instruction: string;
      imageSource: ImageSourcePropType;
      documentProperties: IDocumentProperties;
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
      });
    },
    [navigation, dispatch],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={[styles.titleContainer]}>
            <Text style={[theme.bank.text.boldDarkBlue, styles.title]}>
              {t('screens.kyc.first-id.instruction')}
            </Text>
          </View>

          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycId}
              text={t('screens.kyc.first-id.id')}
              onPress={() =>
                handleOnPress({
                  instruction: t('screens.kyc.id.recto.instruction'),
                  imageSource: IDCardRecto,
                  documentProperties: {
                    category: IDocumentCategory.FIRST_ID,
                    typeId: IDocumentType.ID,
                    name: 'first-id.id.recto',
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
              text={t('screens.kyc.first-id.passport')}
              onPress={() =>
                handleOnPress({
                  instruction: t('screens.kyc.passport.instruction'),
                  imageSource: Passport,
                  documentProperties: {
                    category: IDocumentCategory.FIRST_ID,
                    typeId: IDocumentType.PASSPORT,
                    name: 'first-id.passport.recto',
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
              text={t('screens.kyc.first-id.residence-permit')}
              onPress={() =>
                handleOnPress({
                  instruction: t('screens.kyc.residence-permit.recto.instruction'),
                  imageSource: ResidencePermitRecto,
                  documentProperties: {
                    category: IDocumentCategory.FIRST_ID,
                    typeId: IDocumentType.RESIDENT_PERMIT,
                    name: 'first-id.residence-permit.recto',
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
  titleContainer: {
    marginBottom: 50,
  },
  itemContainer: {
    marginVertical: 32,
  },
  title: {
    fontSize: 16,
  },
});
