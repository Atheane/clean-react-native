import { useCallback, useEffect, useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import { View, StyleSheet, StyleProp, ViewStyle, Dimensions, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { IBeneficiary } from '@clean-rn/beneficiary/domain';
import { IContact } from '@clean-rn/contact/domain';
import {
  PrimaryButton,
  LinkButton,
  LinkButtonColors,
  BeneficiaryAdd,
  BeneficiaryCardList,
  ContactCardList,
  BANK,
  Colors,
} from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IBeneficiaryStackPages } from '../../../shared/presentation/types';
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
          <View style={{ height: 23, marginLeft: -80, justifyContent: 'center' }}>
            <BeneficiaryAdd style={{ marginTop: 15 } as StyleProp<ViewStyle>} />
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
        title={t('screens.beneficiary.add-beneficiary')}
        onPress={handleOnPressAdd}
        iconOne={() => (
          <View style={{ height: 23, marginLeft: -80, justifyContent: 'center' }}>
            <BeneficiaryAdd style={{ marginTop: 15 } as StyleProp<ViewStyle>} />
          </View>
        )}
        long
      />
    </View>
  );
};

const ContentBeneficiary = (props: { data: IBeneficiary[] }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOnPressAdd = useCallback(() => {
    navigation.navigate(IBeneficiaryStackPages.BENEFICIARY_ADD as never);
  }, [navigation]);

  const handleOnPressDelete = useCallback(
    (beneficiaryId: number) => {
      dispatch(beneficiaryDelete({ beneficiaryId }));
    },
    [dispatch],
  );
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <BeneficiaryCardList data={props.data} onDelete={handleOnPressDelete} />
        </View>
      </SafeAreaView>
      <View style={styles.top}>
        <View style={styles.addBeneficiary}>
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
        <View style={styles.addBeneficiary}>
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

const Beneficiary = () => {
  const { beneficiaries } = useSelector((state: IRootState) => state.beneficiary.beneficiaries);
  const hasBeneficiary = beneficiaries && beneficiaries?.length > 0;
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
const Contact = () => {
  const { contacts } = useSelector((state: IRootState) => state.beneficiary.contacts);
  const hasContact = contacts && contacts?.length > 0;
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
  const [index, setIndex] = useState(0);

  return (
    <ErrorBoundary t={t}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: 'green',
              height: 3,
            }}
          >
            <Tab.Item
              title="Bank"
              active={true}
              titleStyle={{ fontSize: 12, color: Colors.bank.primary.green }}
              icon={BANK}
            >
              Bank
            </Tab.Item>
            <Tab.Item
              title="Contact"
              titleStyle={{ fontSize: 12, color: Colors.bank.primary.green }}
              icon={{ name: 'people-outline', type: 'ionicon', color: Colors.bank.primary.green }}
            >
              Contacts
            </Tab.Item>
          </Tab>
        </View>

        <View style={styles.tabContent}>
          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
              <Beneficiary />
            </TabView.Item>
            <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
              <Contact />
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
  row: {},
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
