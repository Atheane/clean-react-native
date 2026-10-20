import { useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Colors, FontNames, SubmitButton, MultipleOptionsCheckBox } from '@clean-rn/ui-mobile';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

const HEIGHT = Dimensions.get('window').height;

export const ResidenceProofOptions = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [choice, setChoice] = useState(IKycStackPages.RESIDENCE_PROOF_LIST as string);
  const handleOnChange = useCallback((choice: string) => {
    setChoice(choice);
  }, []);

  const handleOnPress = useCallback(() => {
    navigation.navigate(choice as never);
  }, [choice, navigation]);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <View style={[styles.itemContainer]}>
            <MultipleOptionsCheckBox
              vertical
              optionsTitle={[
                t('screens.kyc.residence-proof-options.has-proof'),
                t('screens.kyc.residence-proof-options.no-proof'),
              ]}
              optionsValues={[IKycStackPages.RESIDENCE_PROOF_LIST, IKycStackPages.MENU_KYC_HOST]}
              onChange={handleOnChange}
            />
            <View style={styles.buttonContainer}>
              <SubmitButton
                title={t('button.submit')}
                uppercase={false}
                onSubmit={handleOnPress}
                loading={false}
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
    marginTop: 80,
  },
});
