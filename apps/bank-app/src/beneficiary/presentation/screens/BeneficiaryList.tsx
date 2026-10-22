import { useCallback, useEffect, useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import { View, StyleSheet, Dimensions, SafeAreaView, StyleProp, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { IconNode } from '@rneui/base';

import { IBeneficiary } from '@clean-rn/beneficiary/domain';
import { IContact } from '@clean-rn/contact/domain';
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
} from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IBeneficiaryStackPages, ITransferStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary } from '../../../shared/presentation/hoc';

import { beneficiaryDelete, beneficiaryList } from '../../application/commands/beneficiary';
import { contactList } from '../../application/commands/contact';

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
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const handleOnPressAdd = useCallback(() => {
    navigation.navigate(IBeneficiaryStackPages.BENEFICIARY_ADD as never);
  }, [navigation]);

  const handleOnPress = useCallback(
    (beneficiaryId: number) => {
      console.log('handleOnPress', beneficiaryId);
      navigation.navigate(ITransferStackPages.MENU, { beneficiaryId });
    },
    [dispatch],
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

  const handleOnPressAdd = useCallback(() => {
    navigation.navigate(IBeneficiaryStackPages.CONTACT_ADD as never);
  }, [navigation]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ContactCardList data={props.data} />
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

const Beneficiary = ({ beneficiaries }: { beneficiaries: IBeneficiary[] | null }) => {
  const hasBeneficiary = beneficiaries && beneficiaries.length > 0;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(beneficiaryList());
  }, [dispatch]);

  return (
    <>
      {!hasBeneficiary && <ContentNoBeneficiary />}
      {hasBeneficiary && <ContentBeneficiary data={beneficiaries} />}
    </>
  );
};

// TODO Refactor after UX review
const Contact = ({ contacts }: { contacts: IContact[] | null }) => {
  const hasContact = contacts && contacts.length > 0;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(contactList());
  }, [dispatch]);

  return (
    <>
      {!hasContact && <ContentNoContact />}
      {hasContact && <ContentContact data={contacts} />}
    </>
  );
};

export const BeneficiaryList = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [index, setIndex] = useState(0);

  const { beneficiaries } = useSelector((state: IRootState) => state.beneficiary.beneficiaries);
  const { contacts } = useSelector((state: IRootState) => state.beneficiary.contacts);

  return (
    <ErrorBoundary t={t}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: Colors.bank.primary.lightGreen,
              height: 3,
            }}
          >
            <Tab.Item
              title="bank"
              active={true}
              titleStyle={{ fontSize: 13, color: Colors.bank.primary.lightGreen, marginTop: 8 }}
              icon={BankBuilding as IconNode}
            >
              {t('screens.beneficiary.bank')}
            </Tab.Item>
            <Tab.Item
              title="contact"
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
            onChange={setIndex}
            animationType="spring"
            containerStyle={{ backgroundColor: Colors.bank.primary.white }}
          >
            <TabView.Item
              style={[
                beneficiaries?.length === 0 && (theme.bank.shadow.button as StyleProp<ViewStyle>),
                { width: '100%' },
              ]}
            >
              <Beneficiary beneficiaries={beneficiaries} />
            </TabView.Item>
            <TabView.Item
              style={[
                contacts?.length === 0 && (theme.bank.shadow.button as StyleProp<ViewStyle>),
                { width: '100%' },
              ]}
            >
              <Contact contacts={contacts} />
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
    marginTop: 50,
  },
  content: {
    marginTop: 30,
    height: Dimensions.get('window').height - 300,
  },
  scrollNoBeneficiary: {
    alignItems: 'center',
  },
});
