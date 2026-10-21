/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { IBeneficiary } from '@clean-rn/beneficiary/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { BeneficiaryApi } from '@clean-rn/beneficiary/infrastructure';

import { beneficiaryListed, IBeneficiaryTypes, beneficiaryListInit } from '../../commands/beneficiary';
import { IAuthStackPages, IHomeStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectBeneficiary } from '../../state-management/selectors';

export function* listBeneficiarySaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IBeneficiaryTypes.BENEFICIARY_LIST, listBeneficiaryGenerator, httpConnection);
}

export function* listBeneficiaryGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    console.log('GET BENEFICIARIES USECASE');
    const { beneficiaries: beneficiariesFromStore } = yield select(selectBeneficiary);
    let beneficiaries;
    if (beneficiariesFromStore) {
      beneficiaries = beneficiariesFromStore;
      yield put(beneficiaryListed(beneficiaries));
      yield call(navigate, { route: IHomeStackPages.BENEFICIARY_LIST });
    } else {
      const api = BeneficiaryApi.getInstance(httpConnection);
      const beneficiaries: IBeneficiary[] = yield call([api, api.getBeneficiary]);

      yield put(beneficiaryListed(beneficiaries));
      yield call(navigate, { route: IHomeStackPages.BENEFICIARY_LIST });
    }
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(beneficiaryListInit());
    yield put(showUnknownError(error as Error));
  }
}
