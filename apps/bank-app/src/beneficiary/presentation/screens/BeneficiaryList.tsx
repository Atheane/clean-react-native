import { useCallback, useEffect, useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import { View, StyleSheet, Dimensions, SafeAreaView, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
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
} from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IBeneficiaryStackPages, IKycStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary } from '../../../shared/presentation/hoc';

import { changeTab, listBeneficiaries } from '../../application/commands/beneficiary';
import { listContacts } from '../../application/commands/contact';

import { InitKyc } from '../../../kyc/presentation/assets/images';
import { NoBeneficiary, NoContact } from '../../../beneficiary/presentation/assets/images';

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

  // const handleOnPressDelete = useCallback(
  //   (beneficiaryId: number) => {
  //     dispatch(beneficiaryDelete({ beneficiaryId }));
  //   },
  //   [dispatch],
  // );
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

  const { params } = useRoute() as { params: { idx: number } };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listBeneficiaries());
    dispatch(listContacts());
  }, [dispatch]);

  const [index, setIndex] = useState<number>(params?.idx || 0);

  // https://github.com/react-native-elements/react-native-elements/issues/3784
  const [indicatorX, setIndicatorX] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const tabWidth = windowWidth / 2; // Specify your tabs amount

  const handleOnChangeTab = useCallback(
    (index: number) => {
      setIndex(index);
      setIndicatorX(index * tabWidth); // Setting the right translateX value
      dispatch(changeTab({ idx: index }));
    },
    [tabWidth, dispatch],
  );

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

  return loading ? (
    <LoaderSplashScreen />
  ) : customer?.properties.status === KYC_REVIEW.VALIDATED ? (
    <ErrorBoundary t={t}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Tab
            value={index}
            onChange={handleOnChangeTab}
            scrollable
            indicatorStyle={{
              backgroundColor: Colors.bank.primary.lightGreen,
              height: 3,
              width: Dimensions.get('window').width / 2,
              transform: [{ translateX: indicatorX }], // Overriding the buggy string from the source
            }}
            buttonStyle={{ width: Dimensions.get('window').width / 2 }}
          >
            <Tab.Item
              title="contact"
              active={index === 0}
              titleStyle={{ fontSize: 13, color: Colors.bank.primary.lightGreen, marginTop: 8 }}
              icon={Group2 as IconNode}
            >
              {t('screens.beneficiary.contacts')}
            </Tab.Item>
            <Tab.Item
              title="bank"
              active={index === 1}
              titleStyle={{ fontSize: 13, color: Colors.bank.primary.lightGreen, marginTop: 8 }}
              icon={BankBuilding as IconNode}
            >
              {t('screens.beneficiary.bank')}
            </Tab.Item>
          </Tab>
        </View>

        <View style={[styles.tabContent, { marginTop: 10 }]}>
          <TabView
            value={index}
            onChange={handleOnChangeTab}
            animationType="spring"
            containerStyle={{ backgroundColor: Colors.bank.primary.white }}
          >
            <TabView.Item style={[{ width: '100%' }]}>
              <>
                {hasContact && <ContentContact data={contacts} />}
                {!hasContact && (
                  <View style={theme.bank.container.centeredItem}>
                    <Image source={NoContact} style={{ width: 250, height: 250 }} />
                  </View>
                )}
              </>
            </TabView.Item>
            <TabView.Item style={[{ width: '100%' }]}>
              <>
                {hasBeneficiary && <ContentBeneficiary data={beneficiaries} />}
                {!hasBeneficiary && (
                  <View style={theme.bank.container.centeredItem}>
                    <Image source={NoBeneficiary} style={{ width: 250, height: 250 }} />
                  </View>
                )}
              </>
            </TabView.Item>
          </TabView>
        </View>
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
