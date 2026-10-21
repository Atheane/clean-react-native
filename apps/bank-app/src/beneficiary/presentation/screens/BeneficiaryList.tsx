import { useCallback, useEffect, useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import * as Contacts from 'expo-contacts';

import { IBeneficiary } from '@clean-rn/beneficiary/domain';
import {
  CO2,
  PrimaryButton,
  LinkButton,
  LinkButtonColors,
  Bic as BicIcon,
  ExportPdf,
  BeneficiaryAdd,
  Iban as IbanIcon,
  CopyValueClipboard,
  TransactionsCardsList,
  WhiteBalance,
  Colors,
  FontNames,
} from '@clean-rn/ui-mobile';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IBeneficiaryStackPages } from '../../../shared/presentation/types';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

const ContentNoBeneficiary = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnPressAdd = useCallback(() => {
    navigation.navigate(IBeneficiaryStackPages.BENEFICIARY_ADD);
  }, [navigation]);

  return (
    <>
      <View style={styles.btnAddContainer}>
        <PrimaryButton
          title={t('screens.beneficiary.add-beneficiary')}
          onPress={handleOnPressAdd}
          iconOne={() => (
            <View style={{ height: 23, marginLeft: -60, justifyContent: 'center' }}>
              <ExportPdf style={{ marginTop: 30 } as StyleProp<ViewStyle>} />
            </View>
          )}
          long
        />
      </View>
    </>
  );
};

const ContactList = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Contacts Module Example</Text>
    </View>
  );
};

const TabMenu = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleOnPressAdd = useCallback(() => {
    navigation.navigate(IBeneficiaryStackPages.BENEFICIARY_ADD);
  }, [navigation]);

  const [index, setIndex] = useState(0);

  return (
    <>
      <View style={styles.row}>
        <Tab
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
          variant="primary"
        >
          <Tab.Item
            title="Recent"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'business-outline', type: 'ionicon', color: 'white' }}
          >
            Bank
          </Tab.Item>
          <Tab.Item
            title="cart"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'people-outline', type: 'ionicon', color: 'white' }}
          >
            Contacts
          </Tab.Item>
        </Tab>
      </View>

      <View style={styles.tabContent}>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
            <ContentNoBeneficiary />
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
            <ContactList />
          </TabView.Item>
        </TabView>
      </View>
    </>
  );
};

export const BeneficiaryList = () => {
  const { beneficiaries } = useSelector((state: IRootState) => state.beneficiary.beneficiary);
  const hasBeneficiary = beneficiaries && beneficiaries?.length > 0;
  const { t } = useTranslation();

  return (
    <ErrorBoundary t={t}>
      {!hasBeneficiary && (
        <>
          <View style={styles.container}>
            <TabMenu />
          </View>
        </>
      )}
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
    top: 30,
    left: 150,
    backgroundColor: Colors.bank.primary.darkBlue,
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
    marginTop: 60,
  },
  scrollNoBeneficiary: {
    alignItems: 'center',
  },
});
