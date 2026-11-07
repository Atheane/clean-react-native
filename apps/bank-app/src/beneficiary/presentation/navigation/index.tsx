import { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors, FontNames, BeneficiaryAdd as AddButton } from '@clean-rn/ui-mobile';
import { useTheme } from '@rneui/themed';
import { useSelector } from 'react-redux';

import { headersOptions } from '../../../shared/presentation/navigation/headersOptions';
import { goBack } from '../../../shared/presentation/navigation/navigationRef';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import {
  HeaderTitleAlign,
  IBeneficiaryStackPages,
  IBeneficiaryStackProps,
} from '../../../shared/presentation/types';

import { BeneficiaryAdd, BeneficiaryList, ContactAdd, Transfer, TransferSuccess } from '../screens';
import { KYC_REVIEW } from '@clean-rn/user/domain';

const Stack = createNativeStackNavigator<IBeneficiaryStackProps>();

export const BeneficiaryStack = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const navigation = useNavigation();

  const { tab } = useSelector((state: IRootState) => state.beneficiary.beneficiaries);
  const { permission } = useSelector((state: IRootState) => state.beneficiary.contacts);

  const handleOnPressAdd = useCallback(() => {
    if (tab === 1) {
      navigation.navigate(IBeneficiaryStackPages.BENEFICIARY_ADD as never);
    } else {
      navigation.navigate(IBeneficiaryStackPages.CONTACT_ADD as never);
    }
  }, [navigation, tab]);

  const { customer } = useSelector((state: IRootState) => state.customer);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={IBeneficiaryStackPages.BENEFICIARY_LIST}
        component={BeneficiaryList}
        options={
          customer?.properties.status === KYC_REVIEW.VALIDATED
            ? {
                headerTitle: t('screens.transfer.title'),
                ...headersOptions(),
                headerRight:
                  permission || tab === 1
                    ? () => (
                        <View style={theme.shadow.button}>
                          <TouchableOpacity onPress={handleOnPressAdd}>
                            <AddButton
                              width={styles.headerRightButton.width}
                              height={styles.headerRightButton.height}
                            />
                          </TouchableOpacity>
                        </View>
                      )
                    : undefined,
              }
            : {
                headerTitle: t('screens.transfer.title'),
                ...headersOptions(),
              }
        }
      />
      <Stack.Screen
        name={IBeneficiaryStackPages.BENEFICIARY_ADD}
        component={BeneficiaryAdd}
        options={{
          headerTitle: t('screens.beneficiary.new-beneficiary.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IBeneficiaryStackPages.CONTACT_ADD}
        component={ContactAdd}
        options={{
          headerTitle: t('screens.beneficiary.new-contact.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        name={IBeneficiaryStackPages.TRANSFER}
        component={Transfer}
        options={{
          headerTitle: t('screens.transfer.title'),
          ...headersOptions(goBack),
        }}
      />
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: t('screens.transfer.title'),
          headerTitleAlign: 'center' as HeaderTitleAlign,
          headerTitleStyle: {
            color: Colors.primary.darkBlue,
            fontSize: 19,
            fontFamily: FontNames.MartelSans_600SemiBold,
          },
          headerBackVisible: false,
        }}
        name={IBeneficiaryStackPages.TRANSFER_SUCCESS}
        component={TransferSuccess}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRightButton: {
    width: 62,
    height: 62,
  },
});
