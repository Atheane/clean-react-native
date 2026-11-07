import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import {
  IStepTypes,
  IDocumentType,
  IDocumentProperties,
  IStepStatus,
  IDocumentStatusCode,
} from '@clean-rn/kyc/domain';
import { IconTextItem, KycId, KycPassport, KycResidencePermit } from '@clean-rn/ui-mobile';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { IKycStackPages, IKycStackProps } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { createDocument } from '../../application/commands';
import {
  IDCardRecto,
  IDCardVerso,
  Passport,
  ResidencePermitRecto,
  ResidencePermitVerso,
} from '../assets/images';
const HEIGHT = Dimensions.get('window').height;

type NavigationProp = NativeStackNavigationProp<IKycStackProps>;

export const IdList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
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
      dispatch(createDocument({ documentProperties }));
      navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT, {
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
        <View style={[styles.container, theme.container.centeredItem]}>
          <View style={[styles.titleContainer]}>
            <Text style={[theme.text.boldDarkBlue, styles.title]}>
              {t('screens.kyc.first-id.instruction')}
            </Text>
          </View>

          <View>
            <View style={[styles.itemContainer]}>
              <IconTextItem
                icon={() => <KycId />}
                text={t('screens.kyc.first-id.id')}
                onPress={() =>
                  handleOnPress({
                    instruction: t('screens.kyc.id.recto.instruction'),
                    imageSource: IDCardRecto,
                    documentProperties: {
                      context: IStepTypes.ID,
                      typeId: IDocumentType.ID,
                      name: 'first-id.id.recto',
                      status: IStepStatus.INIT,
                      createdAt: new Date(),
                      statusCode: IDocumentStatusCode.INITIAL,
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
                icon={() => <KycPassport />}
                text={t('screens.kyc.first-id.passport')}
                onPress={() =>
                  handleOnPress({
                    instruction: t('screens.kyc.passport.instruction'),
                    imageSource: Passport,
                    documentProperties: {
                      context: IStepTypes.ID,
                      typeId: IDocumentType.PASSPORT,
                      name: 'first-id.passport.recto',
                      status: IStepStatus.INIT,
                      createdAt: new Date(),
                      statusCode: IDocumentStatusCode.INITIAL,
                    },
                  })
                }
              />
            </View>
            <View style={styles.itemContainer}>
              <IconTextItem
                icon={() => <KycResidencePermit />}
                text={t('screens.kyc.first-id.residence-permit')}
                onPress={() =>
                  handleOnPress({
                    instruction: t('screens.kyc.residence-permit.recto.instruction'),
                    imageSource: ResidencePermitRecto,
                    documentProperties: {
                      context: IStepTypes.ID,
                      typeId: IDocumentType.RESIDENT_PERMIT,
                      name: 'first-id.residence-permit.recto',
                      status: IStepStatus.INIT,
                      createdAt: new Date(),
                      statusCode: IDocumentStatusCode.INITIAL,
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
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT,
    marginTop: -50,
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
