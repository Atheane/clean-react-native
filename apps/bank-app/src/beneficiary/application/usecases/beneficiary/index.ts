/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { IBeneficiary } from '@clean-rn/beneficiary/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { BeneficiaryApi } from '@clean-rn/beneficiary/infrastructure';

import { beneficiaryListed, IBeneficiaryTypes, initializeBeneficiaryList } from '../../commands/beneficiary';
import { IAuthStackPages, IHomeStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectBeneficiary } from '../../state-management/selectors';

export function* listBeneficiarySaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IBeneficiaryTypes.LIST_BENEFICIARY, listBeneficiaryGenerator, httpConnection);
}

export function* listBeneficiaryGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    const { beneficiarys: beneficiarysFromStore } = yield select(selectBeneficiary);
    let beneficiarys;
    if (beneficiarysFromStore) {
      beneficiarys = beneficiarysFromStore;
      yield put(beneficiaryListed(beneficiarys));
      yield call(navigate, { route: IHomeStackPages.BENEFICIARY });
    } else {
      const api = BeneficiaryApi.getInstance(httpConnection);

      const beneficiarys: IBeneficiary[] = yield call([api, api.getBeneficiary]);

      yield put(beneficiaryListed(beneficiarys));
      yield call(navigate, { route: IHomeStackPages.BENEFICIARY });
    }
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeBeneficiaryList());
    yield put(showUnknownError(error as Error));
  }
}
