import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IDocumentType } from '@clean-rn/kyc/domain';
import {
  Colors,
  FontNames,
  IconTextItem,
  KycId,
  KycPassport,
  KycResidencePermit,
  KycDrivingLicense,
  KycHealthCard,
  KycIban,
} from '@clean-rn/ui-mobile';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

const HEIGHT = Dimensions.get('window').height;

export const SecondIdList = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleOnPress = useCallback(
    (documentType: IDocumentType) => {
      navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT as never, { docType: documentType, step: 1 });
    },
    [navigation],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT * 0.9 }]}>
          <View style={[styles.titleContainer]}>
            <Text style={[theme.bank.text.boldDarkBlue, styles.title]}>
              {t('screens.kyc.second-id.instruction')}
            </Text>
          </View>

          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycId}
              text={t('screens.kyc.second-id.id')}
              onPress={() => handleOnPress(IDocumentType.ID)}
            />
          </View>
          <View style={[styles.itemContainer]}>
            <IconTextItem
              icon={KycPassport}
              text={t('screens.kyc.second-id.passport')}
              onPress={() => handleOnPress(IDocumentType.PASSPORT)}
            />
          </View>
          <View style={styles.itemContainer}>
            <IconTextItem
              icon={KycResidencePermit}
              text={t('screens.kyc.second-id.residence-permit')}
              onPress={() => handleOnPress(IDocumentType.RESIDENT_PERMIT)}
            />
          </View>
          <View style={styles.itemContainer}>
            <IconTextItem
              icon={KycDrivingLicense}
              text={t('screens.kyc.second-id.driving-license')}
              onPress={() => handleOnPress(IDocumentType.DRIVING_LICENSE)}
            />
          </View>
          <View style={styles.itemContainer}>
            <IconTextItem
              icon={KycHealthCard}
              text={t('screens.kyc.second-id.health-card')}
              onPress={() => handleOnPress(IDocumentType.HEALTH_INSURANCE_CARD)}
            />
          </View>
          <View style={styles.itemContainer}>
            <IconTextItem
              icon={KycIban}
              text={t('screens.kyc.second-id.iban')}
              onPress={() => handleOnPress(IDocumentType.BANK_ID)}
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
