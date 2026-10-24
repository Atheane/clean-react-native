import { useCallback } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import {
  BlueGradientMail,
  FormUpdateIdentity,
  PhoneBlueGradient,
  IUpdateIdentityFormData,
  useCleanErrorOnFocus,
} from '@clean-rn/ui-mobile';
import { BirthDay, Country, IUpdateUserCommand, KYC_REVIEW } from '@clean-rn/user/domain';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { fetchUpdateUser } from '../../application/commands';
import { IParametersStackPages } from '../../../shared/presentation/types';
import { firstLetterCapitalize } from '@clean-rn/utils';

export const ProfileIdentity = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { user, error, pending } = useSelector((state: IRootState) => state.user);
  const { email } = useSelector((state: IRootState) => state.auth);
  const { customer } = useSelector((state: IRootState) => state.kyc.customer);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateIdentityFormData>({
    defaultValues: {
      firstName: user?.properties.identity?.firstName
        ? firstLetterCapitalize(user?.properties.identity?.firstName)
        : '',
      lastName: user?.properties.identity?.lastName
        ? firstLetterCapitalize(user?.properties.identity?.lastName)
        : '',
      birthday: user?.properties.birth?.birthday.value
        ? dayjs(user?.properties.birth?.birthday.value)
        : dayjs('1980-01-01'),
      birthCountry: user?.properties.birth?.birthCountry?.value,
      nationality: user?.properties.birth?.nationality?.value,
    },
  });

  const dispatch = useDispatch();

  const onSubmit = useCallback(
    (formData: IUpdateIdentityFormData) => {
      const { firstName, lastName, birthday, birthCountry, nationality } = formData;
      let updatedFormData: IUpdateUserCommand & { nextRoute: IParametersStackPages } = {
        nextRoute: IParametersStackPages.PROFILE_ADDRESS,
      };
      if (!user) {
        return;
      }
      if (firstName && firstName.toLocaleLowerCase() !== user.properties.identity?.firstName) {
        updatedFormData = {
          ...updatedFormData,
          firstName,
        };
      }
      if (lastName && lastName.toLocaleLowerCase() !== user.properties.identity?.lastName) {
        updatedFormData = {
          ...updatedFormData,
          lastName,
        };
      }
      if (birthday && birthday.format('YYYY-MM-DD') !== user.properties.birth?.birthday.value) {
        updatedFormData = {
          ...updatedFormData,
          birthDay: new BirthDay(birthday),
        };
      }
      if (birthCountry && birthCountry !== user.properties.birth?.birthCountry?.value) {
        updatedFormData = {
          ...updatedFormData,
          birthCountry: new Country(birthCountry),
        };
      }
      if (nationality && nationality !== user.properties.birth?.nationality?.value) {
        updatedFormData = {
          ...updatedFormData,
          nationality: new Country(nationality),
        };
      }
      dispatch(fetchUpdateUser(updatedFormData));
    },
    [dispatch, user],
  );

  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View
          style={[
            styles.container,
            customer?.properties.status === KYC_REVIEW.VALIDATED && {
              marginTop: 100,
              marginBottom: Dimensions.get('window').height,
            },
          ]}
        >
          <View style={[styles.rowContainer, { marginTop: 28 }]}>
            <View style={styles.iconContainer}>
              <BlueGradientMail />
            </View>
            {email && (
              <View style={styles.textContainer}>
                <Text style={[theme.bank.text.darkBlue]}>{email.value}</Text>
              </View>
            )}
            {!email && user?.properties.email && (
              <View style={styles.textContainer}>
                <Text style={[theme.bank.text.darkBlue]}>{user.properties.email?.value}</Text>
              </View>
            )}
          </View>
          <View style={[styles.rowContainer, { marginTop: 28 }]}>
            <View style={styles.iconContainer}>
              <PhoneBlueGradient />
            </View>
            {user?.properties.phone && (
              <View style={styles.textContainer}>
                <Text style={[theme.bank.text.darkBlue]}>{user?.properties.phone.valueInternational}</Text>
              </View>
            )}
          </View>
          {customer?.properties.status !== KYC_REVIEW.VALIDATED && (
            <FormUpdateIdentity
              loading={pending}
              control={control}
              errors={errors}
              error={domainError}
              onSubmit={handleSubmit(onSubmit)}
              onFocus={onFocus}
            />
          )}
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  iconContainer: {
    marginLeft: 8,
    marginRight: 12,
  },
  textContainer: {
    marginTop: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginVertical: 10,
  },
});
