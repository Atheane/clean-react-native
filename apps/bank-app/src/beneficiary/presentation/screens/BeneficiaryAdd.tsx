import { useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { useCleanErrorOnFocus, FormBeneficiary, IBeneficiaryFormData, Colors } from '@clean-rn/ui-mobile';

import { IRootState } from '../../../shared/application/state-management/reducers/root-reducer';
import { ErrorBoundary, SafeScrollingView } from '../../../shared/presentation/hoc';

import { addBeneficiary } from '../../application/commands/beneficiary';
import { IBeneficiaryStackPages } from '../../../shared/presentation/types';

const HEIGHT = Dimensions.get('window').height;

export const BeneficiaryAdd = () => {
  /// translations
  const { t } = useTranslation();

  // api call
  const { pending, error, addedBeneficiary } = useSelector(
    (state: IRootState) => state.beneficiary.beneficiaries,
  );

  // internal state
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IBeneficiaryFormData>({
    defaultValues: {},
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formData: IBeneficiaryFormData) => {
      dispatch(addBeneficiary(formData));
    },
    [dispatch],
  );

  useEffect(() => {
    if (addedBeneficiary) {
      navigation.navigate(IBeneficiaryStackPages.BENEFICIARY_LIST as never, { params: { idx: 0 } });
    }
  }, [addedBeneficiary, navigation]);

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
    backgroundColor: Colors.bank.primary.white,
  },
});
