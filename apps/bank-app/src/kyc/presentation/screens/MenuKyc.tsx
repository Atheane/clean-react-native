import { useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Colors, FontNames, UploadDocumentCard } from '@clean-rn/ui-mobile';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import {
  BillEdf,
  BillEdfDisabled,
  IdentityCard,
  IdentityCardDisabled,
  Passport,
  PassportDisabled,
  PhotoPortrait,
  PhotoPortraitDisabled,
  W9,
  W9Disabled,
} from '../assets/images';
const HEIGHT = Dimensions.get('window').height;

enum IDocumentType {
  W9 = 'W9',
}
export const MenuKyc = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const { user } = useSelector((state: IRootState) => state.auth.login);

  const handleOnPress = useCallback(() => {
    // navigation.navigate(IKycStackPages.MENU as never);
    console.log('navigate');
  }, [navigation]);

  const documentsNumber = user?.properties.USPerson ? 5 : 4;

  const handleNavigateToUploadDocument = useCallback(
    (documentType: IDocumentType) => {
      navigation.navigate(IKycStackPages.UPLOAD_DOCUMENT, {
        documentType,
      });
    },
    [navigation],
  );

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Text style={[styles.title, theme.bank.text.darkBlue]}>{t('screens.kyc.menu.title')}</Text>
          <Text style={[styles.instruction, theme.bank.text.grey]}>{`${t(
            'screens.kyc.menu.instruction-before.begin',
          )} ${documentsNumber} ${t('screens.kyc.menu.instruction-before.end')}`}</Text>
          <View style={styles.cardsContainer}>
            <UploadDocumentCard
              image={W9}
              imageDisabled={W9Disabled}
              // status={'PENDING'}
              text={t('screens.kyc.menu.w9-form')}
              onPress={() => handleNavigateToUploadDocument(IDocumentType.W9)}
            />
            <UploadDocumentCard
              image={IdentityCard}
              imageDisabled={IdentityCardDisabled}
              // status={'PENDING'}
              text={`${t('screens.kyc.menu.first')} ${t('screens.kyc.menu.identity')}`}
              onPress={() => handleNavigateToUploadDocument(IDocumentType.W9)}
            />
            <UploadDocumentCard
              image={Passport}
              imageDisabled={PassportDisabled}
              // status={'PENDING'}
              text={`${t('screens.kyc.menu.second')} ${t('screens.kyc.menu.identity')}`}
              onPress={() => handleNavigateToUploadDocument(IDocumentType.W9)}
            />
            <UploadDocumentCard
              image={BillEdf}
              imageDisabled={BillEdfDisabled}
              // status={'PENDING'}
              text={t('screens.kyc.menu.address')}
              onPress={() => handleNavigateToUploadDocument(IDocumentType.W9)}
            />
            <UploadDocumentCard
              image={PhotoPortrait}
              imageDisabled={PhotoPortraitDisabled}
              // status={'PENDING'}
              text={t('screens.kyc.menu.photo')}
              onPress={() => handleNavigateToUploadDocument(IDocumentType.W9)}
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
    marginTop: 24,
    alignItems: 'center',
  },
  title: {
    margin: 24,
  },
  instruction: {
    textAlign: 'justify',
    width: '80%',
    marginVertical: 12,
  },
  cardsContainer: {},
});
