import { useCallback, useEffect, useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import { View, StyleSheet, Dimensions, SafeAreaView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { IconNode } from '@rneui/base';

import { IBeneficiary } from '@clean-rn/beneficiary/domain';
import { IContact } from '@clean-rn/contact/domain';
import {
  BeneficiaryCardList,
  ContactCardList,
  BankBuilding,
  Colors,
  Group2,
  LoaderSplashScreen,
} from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IBeneficiaryStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary } from '../../../shared/presentation/hoc';

import { changeTab, listBeneficiaries } from '../../application/commands/beneficiary';
import { listContacts } from '../../application/commands/contact';

import { NoBeneficiary, NoContact } from '../../presentation/assets/images';

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

  const hasBeneficiary = beneficiaries && beneficiaries.length > 0;
  const hasContact = contacts && contacts.length > 0;

  return beneficiaryPending || contactPending ? (
    <LoaderSplashScreen />
  ) : (
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
                {!hasContact && (
                  <View style={theme.bank.container.centeredItem}>
                    <Image source={NoContact} style={{ width: 250, height: 250 }} />
                  </View>
                )}
                {hasContact && <ContentContact data={contacts} />}
              </>
            </TabView.Item>
            <TabView.Item style={[{ width: '100%' }]}>
              <>
                {!hasBeneficiary && (
                  <View style={theme.bank.container.centeredItem}>
                    <Image source={NoBeneficiary} style={{ width: 250, height: 250 }} />
                  </View>
                )}
                {hasBeneficiary && <ContentBeneficiary data={beneficiaries} />}
              </>
            </TabView.Item>
          </TabView>
        </View>
      </View>
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
    marginTop: 30,
    height: Dimensions.get('window').height,
  },
  scrollNoBeneficiary: {
    alignItems: 'center',
  },
});
