import { useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { useCleanErrorOnFocus, FormContact, IContactFormData, Colors } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { addContact } from '../../application/commands/contact';
import { IBeneficiaryStackPages } from '../../../shared/presentation/types';

const HEIGHT = Dimensions.get('window').height;

export const ContactAdd = () => {
  /// translations
  const { t } = useTranslation();

  // api call
  const { pending, error, addedContact } = useSelector((state: IRootState) => state.beneficiary.contacts);

  const navigation = useNavigation();

  useEffect(() => {
    if (addedContact) {
      navigation.navigate(IBeneficiaryStackPages.BENEFICIARY_LIST as never, { params: { idx: 1 } });
    }
  }, [addedContact, navigation]);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactFormData>({
    defaultValues: {},
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
          />
        </View>
      </SafeScrollingView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bank.primary.white,
  },
});
