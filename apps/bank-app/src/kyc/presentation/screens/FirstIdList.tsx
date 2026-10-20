import { useCallback } from 'react';
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
} from '@clean-rn/ui-mobile';
import { IDocumentCategory, IDocumentType, DocumentVO } from '@clean-rn/kyc/domain';

import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import {
  IDCardRecto,
  IDCardVerso,
  Passport,
  ResidencePermitRecto,
  ResidencePermitVerso,
} from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const FirstIdList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(
    ({
      instruction,
      imageSource,
      document,
      nextRouteParams,
    }: {
      instruction: string;
      imageSource: ImageSourcePropType;
      document: DocumentVO;
      nextRouteParams?: {
        instruction: string;
        imageSource: ImageSourcePropType;
      };
    }) => {
      navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT as never, {
        document,
        instruction,
        imageSource,
        nextRouteParams,
      });
    },
    [navigation],
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
                  document: new DocumentVO({
                    category: IDocumentCategory.FIRST_ID,
                    type: IDocumentType.ID,
                    name: 'first-id.id.recto',
                  }),
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
                  document: new DocumentVO({
                    category: IDocumentCategory.FIRST_ID,
                    type: IDocumentType.PASSPORT,
                    name: 'first-id.passport.recto',
                  }),
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
                  document: new DocumentVO({
                    category: IDocumentCategory.FIRST_ID,
                    type: IDocumentType.RESIDENT_PERMIT,
                    name: 'first-id.residence-permit.recto',
                  }),
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
