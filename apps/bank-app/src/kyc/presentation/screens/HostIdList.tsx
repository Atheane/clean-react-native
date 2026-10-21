import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import {
  IDocumentCategory,
  IDocumentType,
  IDocumentProperties,
  IDocumentStatus,
} from '@clean-rn/kyc/domain';
import { IconTextItem, KycId, KycPassport } from '@clean-rn/ui-mobile';

import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { initializeDocument } from '../../application/commands/document';

import { IDCardRecto, IDCardVerso, Passport } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const HostIdList = () => {
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
          <View style={[styles.instructionContainer]}>
            <Text style={[theme.bank.text.darkBlue, styles.instruction]}>
              {t('screens.kyc.host-id-list.instruction')}
            </Text>
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycId}
              text={t('screens.kyc.host-id-list.id')}
              onPress={() =>
                handleOnPress({
                  instruction: t('screens.kyc.host-id.recto.instruction'),
                  imageSource: IDCardRecto,
                  documentProperties: {
                    category: IDocumentCategory.RESIDENCE_PROOF_FIRST_ID,
                    typeId: IDocumentType.ID,
                    name: 'host-id.id.recto',
                    status: IDocumentStatus.INIT,
                    createdAt: new Date(),
                  },
                  nextRouteParams: {
                    instruction: t('screens.kyc.host-id.verso.instruction'),
                    imageSource: IDCardVerso,
                  },
                })
              }
            />
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycPassport}
              text={t('screens.kyc.host-id-list.passport')}
              onPress={() =>
                handleOnPress({
                  instruction: t('screens.kyc.host-passport.instruction'),
                  imageSource: Passport,
                  documentProperties: {
                    category: IDocumentCategory.RESIDENCE_PROOF_FIRST_ID,
                    typeId: IDocumentType.PASSPORT,
                    name: 'host-id.passport.recto',
                    status: IDocumentStatus.INIT,
                    createdAt: new Date(),
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
  instructionContainer: {
    marginBottom: 50,
  },
  itemContainer: {
    marginVertical: 32,
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: '90%',
  },
});
