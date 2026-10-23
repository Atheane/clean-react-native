import { useCallback, useEffect, useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import { View, StyleSheet, Dimensions, SafeAreaView, StyleProp, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { IconNode } from '@rneui/base';

import { IBeneficiary } from '@clean-rn/beneficiary/domain';
import { IContact, Phone } from '@clean-rn/contact/domain';
import {
  PrimaryButton,
  LinkButton,
  LinkButtonColors,
  BeneficiaryAdd,
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

import { listBeneficiaries } from '../../application/commands/beneficiary';
import { listContacts } from '../../application/commands/contact';

const ContentNoBeneficiary = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnPressAdd = useCallback(() => {
    navigation.navigate(IBeneficiaryStackPages.BENEFICIARY_ADD as never);
  }, [navigation]);

  return (
    <View style={styles.btnAddContainer}>
      <PrimaryButton
        title={t('screens.beneficiary.add-beneficiary')}
        onPress={handleOnPressAdd}
        iconOne={() => (
          <View style={styles.iconContainer}>
            <BeneficiaryAdd style={{ marginTop: 15 }} />
          </View>
        )}
        long
      />
    </View>
  );
};

// TODO Refactor  after UX review
const ContentNoContact = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnPressAdd = useCallback(() => {
    navigation.navigate(IBeneficiaryStackPages.CONTACT_ADD as never);
  }, [navigation]);

  return (
    <View style={styles.btnAddContainer}>
      <PrimaryButton
        long
        title={t('screens.beneficiary.add-beneficiary')}
        onPress={handleOnPressAdd}
        iconOne={() => (
          <View style={styles.iconContainer}>
            <BeneficiaryAdd style={{ marginTop: 15 }} />
          </View>
        )}
      />
    </View>
  );
};

const ContentBeneficiary = (props: { data: IBeneficiary[] }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const { beneficiaries } = useSelector((state: IRootState) => state.beneficiary.beneficiaries);

  const handleOnPressAdd = useCallback(() => {
    navigation.navigate(IBeneficiaryStackPages.BENEFICIARY_ADD as never);
  }, [navigation]);

  const handleOnPress = useCallback(
    (beneficiaryId: number) => {
      if (!beneficiaries) {
        return;
      }
      const beneficiary = beneficiaries.find(
        (beneficiary: IBeneficiary) => beneficiary.beneficiaryId === beneficiaryId,
      );
      navigation.navigate(IBeneficiaryStackPages.TRANSFER, {
        beneficiaryId,
        beneficiaryName: beneficiary?.name,
      });
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
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <BeneficiaryCardList data={props.data} onPress={handleOnPress} />
        </View>
      </SafeAreaView>
      <View style={styles.top}>
        <View style={[styles.addBeneficiary, theme.bank.shadow.button]}>
          <LinkButton
            onPress={handleOnPressAdd}
            iconLeft={BeneficiaryAdd}
            colorOption={LinkButtonColors.WHITE}
          />
        </View>
      </View>
    </>
  );
};

const ContentContact = (props: { data: IContact[] }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const { contacts } = useSelector((state: IRootState) => state.beneficiary.contacts);

  // const dispatch = useDispatch();
  const handleOnPress = useCallback(
    (phone: Phone) => {
      if (!contacts) {
        return;
      }
      const contact = contacts.find(
        (contact: IContact) => contact.phone.valueInternational === phone.valueInternational,
      );
      navigation.navigate(IBeneficiaryStackPages.TRANSFER, {
        phoneNumber: phone.valueInternational,
        beneficiaryName: contact?.name,
      });
    },
    [navigation, contacts],
  );

  const handleOnPressAdd = useCallback(() => {
    navigation.navigate(IBeneficiaryStackPages.CONTACT_ADD as never);
  }, [navigation]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ContactCardList data={props.data} onPress={handleOnPress} />
        </View>
      </SafeAreaView>
      <View style={styles.top}>
        <View style={[styles.addBeneficiary, theme.bank.shadow.button]}>
          <LinkButton
            onPress={handleOnPressAdd}
            iconLeft={BeneficiaryAdd}
            colorOption={LinkButtonColors.WHITE}
          />
        </View>
      </View>
    </>
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
    },
    [tabWidth],
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
              title="bank"
              active={index === 0}
              titleStyle={{ fontSize: 13, color: Colors.bank.primary.lightGreen, marginTop: 8 }}
              icon={BankBuilding as IconNode}
            >
              {t('screens.beneficiary.bank')}
            </Tab.Item>
            <Tab.Item
              title="contact"
              active={index === 1}
              titleStyle={{ fontSize: 13, color: Colors.bank.primary.lightGreen, marginTop: 8 }}
              icon={Group2 as IconNode}
            >
              {t('screens.beneficiary.contacts')}
            </Tab.Item>
          </Tab>
        </View>

        <View style={styles.tabContent}>
          <TabView
            value={index}
            onChange={handleOnChangeTab}
            animationType="spring"
            containerStyle={{ backgroundColor: Colors.bank.primary.white }}
          >
            <TabView.Item
              style={[
                beneficiaries?.length === 0 && (theme.bank.shadow.button as StyleProp<ViewStyle>),
                { width: '100%' },
              ]}
            >
              <>
                {!hasBeneficiary && <ContentNoBeneficiary />}
                {hasBeneficiary && <ContentBeneficiary data={beneficiaries} />}
              </>
            </TabView.Item>
            <TabView.Item
              style={[
                contacts?.length === 0 && (theme.bank.shadow.button as StyleProp<ViewStyle>),
                { width: '100%' },
              ]}
            >
              <>
                {!hasContact && <ContentNoContact />}
                {hasContact && <ContentContact data={contacts} />}
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
  top: {
    position: 'absolute',
    top: -60,
    right: 0,
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
    marginTop: 50,
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
