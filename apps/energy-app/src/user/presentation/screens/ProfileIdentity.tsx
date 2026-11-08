import { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@rneui/themed';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import { Colors, Email, Phone, useCleanErrorOnFocus, CopyValueClipboard } from '@clean-rn/ui-mobile';
import { BirthDay, Country, IUpdateUserCommand } from '@clean-rn/user/domain';
import { firstLetterCapitalize } from '@clean-rn/utils';

import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { fetchUpdateUser } from '../../application/commands';
import { IParametersStackPages } from '../../../shared/presentation/types';
import { IUpdateIdentityFormData, FormUpdateIdentity } from '../forms';

export const ProfileIdentity = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const { user, error, pending } = useSelector((state: IRootState) => state.user);
  const { email } = useSelector((state: IRootState) => state.auth);

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
        <View style={[styles.container]}>
          <View style={[styles.rowContainer, { marginTop: 28 }]}>
            {email && (
              <View style={[styles.textContainer, { marginLeft: 8 }]}>
                <CopyValueClipboard
                  value={email.value}
                  icon={() => <Email startColor={Colors.primary.darkBlue} endColor={Colors.secondary.pink} />}
                  copyText={t('screens.profile-identity.copy')}
                  textColor={Colors.primary.darkBlue}
                />
              </View>
            )}
            {!email && user?.properties.email && (
              <View style={styles.textContainer}>
                <Text style={[theme.text.darkBlue]}>{user.properties.email?.value}</Text>
              </View>
            )}
          </View>
          <View style={[styles.rowContainer, { marginTop: 28 }]}>
            <View style={styles.iconContainer}>
              <Phone startColor={Colors.primary.darkBlue} endColor={Colors.secondary.pink} />
            </View>
            {user?.properties.phone && (
              <View style={styles.textContainer}>
                <Text style={[theme.text.darkBlue]}>{user?.properties.phone.valueInternational}</Text>
              </View>
            )}
          </View>

          <FormUpdateIdentity
            loading={pending}
            control={control}
            errors={errors}
            error={domainError}
            onSubmit={handleSubmit(onSubmit)}
            onFocus={onFocus}
          />
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
