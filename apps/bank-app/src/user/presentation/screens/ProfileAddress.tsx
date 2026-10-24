import { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useTheme } from '@rneui/themed';
import { getLocales } from 'expo-localization';

import {
  useCleanErrorOnFocus,
  FormSignupAddress,
  ISignupAddressFormData,
  Colors,
} from '@clean-rn/ui-mobile';
import { IUpdateUserCommand } from '@clean-rn/user/domain';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary } from '../../../shared/presentation/hoc';
import { fetchUpdateUser } from '../../../user/application/commands';
import { IParametersStackPages } from '../../../shared/presentation/types';

const HEIGHT = Dimensions.get('window').height;
const lang = getLocales()[0]?.languageCode || 'FR';

export const ProfileAddress = () => {
  /// translations
  const { t } = useTranslation();
  const { theme } = useTheme();

  // api call
  const dispatch = useDispatch();
  const { pending, error, user } = useSelector((state: IRootState) => state.user);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupAddressFormData>({
    defaultValues: {
      specifiedUSPerson: user?.properties.USPerson ? '1' : '0',
      address: user?.properties.address,
    },
  });

  const onSubmit = useCallback(
    (formData: ISignupAddressFormData) => {
      const { specifiedUSPerson, address } = formData;
      let updatedFormData: IUpdateUserCommand & { nextRoute: IParametersStackPages } = {
        nextRoute: IParametersStackPages.PARAMETERS,
      };
      if (!user) {
        return;
      }

      if (specifiedUSPerson && specifiedUSPerson !== (user?.properties.USPerson ? '1' : '0')) {
        updatedFormData = {
          ...updatedFormData,
          USPerson: specifiedUSPerson === '1' ? true : false,
        };
      }
      updatedFormData = {
        ...updatedFormData,
        address: address.str ? address : user?.properties.address,
      };

      dispatch(fetchUpdateUser(updatedFormData));
    },
    [dispatch, user],
  );

  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <View style={[styles.container, theme.bank.container.centeredItem]}>
        <FormSignupAddress
          loading={pending}
          control={control}
          errors={errors}
          error={domainError}
          onSubmit={handleSubmit(onSubmit)}
          onFocus={onFocus}
          language={lang}
        />
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bank.primary.white,
    height: HEIGHT * 1.15,
  },
});
