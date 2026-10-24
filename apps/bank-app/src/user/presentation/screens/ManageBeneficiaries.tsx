import { useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';

import { IBeneficiary } from '@clean-rn/beneficiary/domain';
import { KYC_REVIEW } from '@clean-rn/user/domain';
import {
  BeneficiaryCardList,
  Colors,
  LoaderSplashScreen,
  SafeScrollingView,
  LinkButton,
  NoBeneficiary,
} from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary } from '../../../shared/presentation/hoc';

import { deleteBeneficiary, listBeneficiaries } from '../../../beneficiary/application/commands/beneficiary';

import { InitKyc } from '../../../kyc/presentation/assets/images';

const ContentBeneficiary = (props: { data: IBeneficiary[] }) => {
  const dispatch = useDispatch();
  const handleOnPressDelete = useCallback(
    (beneficiaryId: number) => {
      dispatch(deleteBeneficiary({ beneficiaryId }));
    },
    [dispatch],
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BeneficiaryCardList data={props.data} onDelete={handleOnPressDelete} />
      </View>
    </SafeAreaView>
  );
};

export const ManageBeneficiaries = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { customer, pending: customerPending } = useSelector((state: IRootState) => state.kyc.customer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBeneficiaries());
  }, [dispatch]);

  const { beneficiaries, pending: beneficiaryPending } = useSelector(
    (state: IRootState) => state.beneficiary.beneficiaries,
  );

  const hasBeneficiary = beneficiaries && beneficiaries.length > 0;

  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate(IKycStackPages.MENU as never);
  }, [navigation]);

  return beneficiaryPending || customerPending ? (
    <LoaderSplashScreen />
  ) : customer?.properties.status === KYC_REVIEW.VALIDATED ? (
    <ErrorBoundary t={t}>
      <View style={styles.container}>
        {hasBeneficiary && <ContentBeneficiary data={beneficiaries} />}
        {!hasBeneficiary && !beneficiaryPending && (
          <View style={theme.bank.container.centeredItem}>
            <Image source={NoBeneficiary} style={{ width: 250, height: 250 }} />
          </View>
        )}
      </View>
    </ErrorBoundary>
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.containerKYCMissing, theme.bank.container.centeredItem]}>
          <Image source={InitKyc} style={{ width: 250, height: 250 }} />
          <Text style={[styles.instruction, theme.bank.text.grey]}>
            {t('screens.beneficiary.kyc-missing.instruction')}
            <Text style={[styles.instruction, theme.bank.text.boldGrey]}>
              {t('screens.beneficiary.kyc-missing.instruction-bold')}
            </Text>
          </Text>
          <LinkButton
            title={t('screens.beneficiary.kyc-missing.link-instruction')}
            onPress={handleOnPress}
            inline={[theme.bank.text.darkBlue]}
          />
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
    marginTop: 0,
  },
  row: {
    width: Dimensions.get('window').width,
  },
  addBeneficiary: {
    position: 'relative',
    top: 0,
    right: 0,
  },
  btnAddContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  iconContainer: { height: 23, marginLeft: -80, justifyContent: 'center' },
  tabContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    height: Dimensions.get('window').height,
  },
  scrollNoBeneficiary: {
    alignItems: 'center',
  },
  instruction: {
    textAlign: 'center',
    width: '85%',
    marginVertical: 24,
  },
  containerKYCMissing: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
    height: Dimensions.get('window').height,
    marginTop: -100,
  },
});
