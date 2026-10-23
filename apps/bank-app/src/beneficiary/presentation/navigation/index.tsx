import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Colors,
  FontNames,
  LinkButton,
  LinkButtonColors,
  BeneficiaryAdd as AddButton,
} from '@clean-rn/ui-mobile';
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

const Stack = createNativeStackNavigator<IBeneficiaryStackProps>();

export const BeneficiaryStack = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const navigation = useNavigation();

  const { tab } = useSelector((state: IRootState) => state.beneficiary.beneficiaries);

  const handleOnPressAdd = useCallback(() => {
    if (tab === 1) {
      navigation.navigate(IBeneficiaryStackPages.BENEFICIARY_ADD as never);
    } else {
      navigation.navigate(IBeneficiaryStackPages.CONTACT_ADD as never);
    }
  }, [navigation, tab]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={IBeneficiaryStackPages.BENEFICIARY_LIST}
        component={BeneficiaryList}
        options={{
          headerTitle: t('screens.transfer.title'),
          ...headersOptions(),
          headerRight: () => (
            <View style={[theme.bank.shadow.button, styles.addButton]}>
              <LinkButton
                onPress={handleOnPressAdd}
                iconLeft={AddButton}
                colorOption={LinkButtonColors.WHITE}
              />
            </View>
          ),
        }}
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
            color: Colors.bank.primary.darkBlue,
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

const HEADER_HEIGHT = 44;

const styles = StyleSheet.create({
  addButton: { position: 'absolute', top: -HEADER_HEIGHT, right: -30 },
});
