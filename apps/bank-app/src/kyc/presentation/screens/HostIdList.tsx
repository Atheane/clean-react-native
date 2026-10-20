import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IDocumentType } from '@clean-rn/kyc/domain';
import { IconTextItem, KycId, KycPassport } from '@clean-rn/ui-mobile';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IDCardRecto } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const HostIdList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(
    ({ instruction, imageSource }: { instruction: string; imageSource: ImageSourcePropType }) => {
      navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT as never, {
        instruction,
        imageSource,
      });
    },
    [navigation],
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
                  imageSource: IDCardRecto,
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
