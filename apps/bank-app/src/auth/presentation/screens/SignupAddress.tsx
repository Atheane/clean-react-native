import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import {
  Colors,
  useCleanErrorOnFocus,
  FormSignupAddress,
  LinkButton,
  LinkButtonColors,
  ISignupAddressFormData,
} from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { IAuthStackPages } from '../../../shared/presentation/types';
import { ScreenWrapper } from '../../../shared/presentation/hoc';

import { registerAddress } from '../../application/commands/signup';

export const SignupAddress = () => {
  const { t } = useTranslation();

  // api call
  const dispatch = useDispatch();

  const { pending, error, user } = useSelector((state: IRootState) => state.auth.signup);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupAddressFormData>({
    defaultValues: {
      specifiedUSPerson: '0',
      country: user?.properties.phone?.countryCode,
    },
  });

  const onSubmit = useCallback(
    (formData: ISignupAddressFormData) => {
      dispatch(
        registerAddress({
          ...formData,
          str: formData.street,
          USPerson: formData.specifiedUSPerson === '1',
        }),
      );
    },
    [dispatch],
  );

  // navigation
  const navigation = useNavigation();

  const onPressLegal = useCallback(() => {
    navigation.navigate(IAuthStackPages.LEGAL as never);
  }, [navigation]);

  const onPressCgu = useCallback(() => {
    navigation.navigate(IAuthStackPages.CGU as never);
  }, [navigation]);

  const onPressCguKycProvider = useCallback(() => {
    navigation.navigate(IAuthStackPages.CGU_KYC_PROVIDER as never);
  }, [navigation]);

  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ScreenWrapper>
      <>
        <FormSignupAddress
          loading={pending}
          control={control}
          errors={errors}
          error={domainError}
          defaultCountry={user?.properties.phone?.countryCode}
          onSubmit={handleSubmit(onSubmit)}
          onFocus={onFocus}
        />
        <View style={styles.cgu}>
          <LinkButton
            title={t('screens.legal')}
            arrow={false}
            colorOption={LinkButtonColors.BLUE}
            pressed={false}
            onPress={onPressLegal}
          />
          <LinkButton
            title={t('screens.cgu')}
            arrow={false}
            colorOption={LinkButtonColors.BLUE}
            pressed={false}
            onPress={onPressCgu}
          />
          <LinkButton
            title={t('screens.cgu-kyc-provider')}
            arrow={false}
            colorOption={LinkButtonColors.BLUE}
            pressed={false}
            onPress={onPressCguKycProvider}
          />
        </View>
      </>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
  },
  cgu: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
