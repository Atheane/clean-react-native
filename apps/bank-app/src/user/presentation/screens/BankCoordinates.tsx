import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import {
  Bic as BicIcon,
  Iban as IbanIcon,
  CopyValueClipboard,
  ShareIcon,
  PdfDownloader,
} from '@clean-rn/ui-mobile';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

const HEIGHT = Dimensions.get('window').height;

export const BankCoordinates = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { accounts } = useSelector((state: IRootState) => state.account.accounts);

  const {
    auth: { accessToken },
  } = useSelector((state: IRootState) => state.auth);

  const handleError = (error: unknown) => {
    showUnknownError(error as Error);
  };

  const navigation = useNavigation();

  const nextNavigation = () => {
    navigation.goBack();
  };

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <Text style={[styles.instruction, theme.bank.text.grey]}>
            {t('screens.bank-coordinates.instruction')}
          </Text>
          <Text style={[theme.bank.text.boldDarkBlue]}>{t('screens.bank-coordinates.bank-account')}</Text>
          {accounts && accounts[0] && (
            <View>
              <CopyValueClipboard value={accounts[0].iban.value} icon={IbanIcon} />
              <CopyValueClipboard value={accounts[0].bic.value} icon={BicIcon} />
            </View>
          )}
          {accounts && accounts[0] && (
            <View style={styles.buttonContainer}>
              <PdfDownloader
                uri={`${process.env.EXPO_PUBLIC_BASE_URL_API}/app/account/${accounts[0].accountId}/rib`}
                headers={{
                  Authorization: `Bearer ${accessToken}`,
                }}
                handleError={handleError}
                icon={ShareIcon}
                fileName={`account-details.pdf`}
                primaryButtonTitle={t('screens.bank-coordinates.share')}
                nextNavigation={nextNavigation}
              />
            </View>
          )}
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 40,
  },
  buttonContainer: {
    marginTop: 80,
  },
  instruction: {
    textAlign: 'justify',
    width: '80%',
    marginVertical: 60,
  },
});
