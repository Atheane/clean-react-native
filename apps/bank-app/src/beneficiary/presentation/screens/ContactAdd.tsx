import { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { useForm } from 'react-hook-form';

import { useCleanErrorOnFocus, Colors } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { addContact } from '../../application/commands/contact';

import { FormContact, IContactFormData } from '../forms/form-contact';

const locales = getLocales();

const HEIGHT = Dimensions.get('window').height;

export const ContactAdd = () => {
  /// translations
  const { t } = useTranslation();

  // api call
  const { pending, error } = useSelector((state: IRootState) => state.beneficiary.contacts);

  // internal state
  const defaultCountry = locales[0]?.regionCode || undefined;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactFormData>({
    defaultValues: {
      countryCode: defaultCountry,
    },
  });

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: IContactFormData) => {
      dispatch(addContact(formData));
    },
    [dispatch],
  );
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <FormContact
            loading={pending}
            control={control}
            errors={errors}
            error={domainError}
            onSubmit={handleSubmit(onSubmit)}
            onFocus={onFocus}
            defaultCountry={defaultCountry}
          />
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.white,
  },
});
