import { useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { useCleanErrorOnFocus, FormBeneficiary, IBeneficiaryFormData, Colors } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';
import { showUnknownError } from '../../../shared/application/commands/manage-global-errors';

import { beneficiaryAdd } from '../../application/commands/beneficiary';

const HEIGHT = Dimensions.get('window').height;

export const BeneficiaryAdd = () => {
  /// translations
  const { t } = useTranslation();

  // api call
  const { pending, error } = useSelector((state: IRootState) => state.beneficiary.beneficiaries);

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBeneficiaryFormData>({
    defaultValues: {},
  });

  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: IBeneficiaryFormData) => {
      try {
        dispatch(beneficiaryAdd(formData));
      } catch (e: unknown) {
        dispatch(showUnknownError(e as Error));
      }
    },
    [dispatch],
  );
  const { domainError, onFocus } = useCleanErrorOnFocus(error);

  return (
    <ErrorBoundary t={t}>
      <SafeScrollingView>
        <View style={[styles.container, { height: HEIGHT }]}>
          <FormBeneficiary
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
    backgroundColor: Colors.bank.primary.white,
  },
});
