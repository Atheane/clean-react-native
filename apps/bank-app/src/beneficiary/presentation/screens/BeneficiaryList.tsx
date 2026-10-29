import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { IconNode } from '@rneui/base';

import { IBeneficiary } from '@clean-rn/beneficiary/domain';
import { IContact } from '@clean-rn/contact/domain';
import { KYC_REVIEW } from '@clean-rn/user/domain';
import {
  BeneficiaryCardList,
  ContactCardList,
  BankBuilding,
  Colors,
  Group2,
  LoaderSplashScreen,
  SafeScrollingView,
  LinkButton,
  Tabs,
} from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IBeneficiaryStackPages, IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary } from '../../../shared/presentation/hoc';

import { changeTab, listBeneficiaries } from '../../application/commands/beneficiary';
import { listContacts } from '../../application/commands/contact';

import { InitKyc } from '../../../kyc/presentation/assets/images';
import {
  NoBeneficiary as NoBeneficiaryImg,
  NoContact as NoContactImg,
} from '../../../beneficiary/presentation/assets/images';

const NoContact = () => {
  const { theme } = useTheme();
  return (
    <View style={theme.container.centeredItem}>
      <Image source={NoContactImg} style={{ width: 250, height: 250 }} />
    </View>
  );
};

const NoBeneficiary = () => {
  const { theme } = useTheme();
  return (
    <View style={theme.container.centeredItem}>
      <Image source={NoBeneficiaryImg} style={{ width: 250, height: 250 }} />
    </View>
  );
};

const ContentBeneficiary = (props: { data: IBeneficiary[] }) => {
  const navigation = useNavigation();

  const { beneficiaries } = useSelector((state: IRootState) => state.beneficiary.beneficiaries);

  //todo refactorize
  const handleOnPress = useCallback(
    (beneficiaryId: number) => {
      if (!beneficiaries) {
        return;
      }
      const beneficiary = beneficiaries.find(
        (beneficiary: IBeneficiary) => beneficiary.beneficiaryId === beneficiaryId,
      );
      navigation.navigate(
        IBeneficiaryStackPages.TRANSFER,
        beneficiary?.accountId
          ? {
              beneficiaryAccountId: beneficiary?.accountId,
              beneficiaryName: beneficiary?.name,
            }
          : {
              beneficiaryId,
              beneficiaryName: beneficiary?.name,
            },
      );
    },
    [navigation, beneficiaries],
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BeneficiaryCardList data={props.data} onPress={handleOnPress} />
      </View>
    </SafeAreaView>
  );
};

const ContentContact = (props: { data: IContact[] }) => {
  const navigation = useNavigation();

  const { contacts } = useSelector((state: IRootState) => state.beneficiary.contacts);

  const handleOnPress = useCallback(
    (phoneString: string) => {
      if (!contacts) {
        return;
      }
      const contact = contacts.find((contact: IContact) => contact.phone.valueInternational === phoneString);
      navigation.navigate(IBeneficiaryStackPages.TRANSFER, {
        phoneNumber: phoneString,
        beneficiaryName: contact?.name,
      });
    },
    [navigation, contacts],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ContactCardList data={props.data} onPress={handleOnPress} />
      </View>
    </SafeAreaView>
  );
};

export const BeneficiaryList = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { customer, pending: customerPending } = useSelector((state: IRootState) => state.kyc.customer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBeneficiaries());
    dispatch(listContacts());
  }, [dispatch]);

  const { beneficiaries, pending: beneficiaryPending } = useSelector(
    (state: IRootState) => state.beneficiary.beneficiaries,
  );
  const { contacts, pending: contactPending } = useSelector(
    (state: IRootState) => state.beneficiary.contacts,
  );

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(
      () => {
        setLoading(false);
      },
      !(customerPending || contactPending || beneficiaryPending) ? 500 : 0,
    );
  }, [customerPending, contactPending, beneficiaryPending]);

  const hasBeneficiary = beneficiaries && beneficiaries.length > 0;
  const hasContact = contacts && contacts.length > 0;

  const navigation = useNavigation();

  const handleOnPress = useCallback(() => {
    navigation.navigate(IKycStackPages.MENU as never);
  }, [navigation]);

  const handleOnChangeTab = useCallback(
    (index: number) => {
      dispatch(changeTab({ idx: index }));
    },
    [dispatch],
  );

  return loading ? (
    <LoaderSplashScreen />
  ) : customer?.properties.status === KYC_REVIEW.VALIDATED ? (
    <ErrorBoundary t={t}>
      <Tabs
        tabsCount={2}
        titles={[t('screens.beneficiary.contacts'), t('screens.beneficiary.beneficiaries')]}
        icons={[Group2, BankBuilding] as IconNode[]}
        contents={
          [
            hasContact ? <ContentContact data={contacts} /> : <NoContact />,
            hasBeneficiary ? <ContentBeneficiary data={beneficiaries} /> : <NoBeneficiary />,
          ] as React.ReactNode[]
        }
        changeTab={handleOnChangeTab}
        color={Colors.primary.lightGreen}
      />
    </ErrorBoundary>
  ) : (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.containerKYCMissing, theme.container.centeredItem]}>
          <Image source={InitKyc} style={{ width: 250, height: 250 }} />
          <Text style={[styles.instruction, theme.text.grey]}>
            {t('screens.beneficiary.kyc-missing.instruction')}
            <Text style={[styles.instruction, theme.text.boldGrey]}>
              {t('screens.beneficiary.kyc-missing.instruction-bold')}
            </Text>
          </Text>
          <LinkButton
            title={t('screens.beneficiary.kyc-missing.link-instruction')}
            onPress={handleOnPress}
            inline={[theme.text.darkBlue]}
          />
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    marginTop: 0,
  },
  content: {
    flex: 1,
    height: Dimensions.get('window').height,
  },
  instruction: {
    textAlign: 'center',
    width: '85%',
    marginVertical: 24,
  },
  containerKYCMissing: {
    flex: 1,
    backgroundColor: Colors.primary.white,
    height: Dimensions.get('window').height,
    marginTop: -100,
  },
});
