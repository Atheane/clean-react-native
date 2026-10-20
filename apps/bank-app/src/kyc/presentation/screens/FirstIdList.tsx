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
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { IDCardRecto, Passport, ResidencePermitRecto } from '../assets/images';

const HEIGHT = Dimensions.get('window').height;

export const FirstIdList = () => {
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
