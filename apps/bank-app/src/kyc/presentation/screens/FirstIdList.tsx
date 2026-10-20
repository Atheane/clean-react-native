import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IDocumentType } from '@clean-rn/kyc/domain';
import { Colors, FontNames, IconTextItem, IDCard, Passport, ResidencePermit } from '@clean-rn/ui-mobile';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

const HEIGHT = Dimensions.get('window').height;

export const FirstIdList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(
    (documentType: IDocumentType) => {
      navigation.navigate(IKycStackPages.UPLOAD_PHOTO as never, { docType: documentType });
    },
    [navigation],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Text style={theme.bank.text.darkBlue}>{t('screens.kyc.first-id.instruction')}</Text>
          <View style={[styles.itemContainer, { marginTop: 54 }]}>
            <IconTextItem
              icon={IDCard}
              text={t('screens.kyc.first-id.id')}
              onPress={() => handleOnPress(IDocumentType.ID)}
            />
          </View>
          <View style={[styles.itemContainer, { marginLeft: -10 }]}>
            <IconTextItem
              icon={Passport}
              text={t('screens.kyc.first-id.passport')}
              onPress={() => handleOnPress(IDocumentType.PASSPORT)}
            />
          </View>
          <View style={styles.itemContainer}>
            <IconTextItem
              icon={ResidencePermit}
              text={t('screens.kyc.first-id.residence-permit')}
              onPress={() => handleOnPress(IDocumentType.RESIDENT_PERMIT)}
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
    marginTop: 60,
  },
  iconContainer: { position: 'relative', left: 10, top: 2 },
  itemContainer: {
    marginVertical: 20,
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
