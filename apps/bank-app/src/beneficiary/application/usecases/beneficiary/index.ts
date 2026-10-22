/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import { BeneficiaryError, IBeneficiary, IBeneficiaryAddCommand } from '@clean-rn/beneficiary/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { BeneficiaryApi } from '@clean-rn/beneficiary/infrastructure';

import {
  beneficiaryListed,
  IBeneficiaryTypes,
  beneficiaryListInit,
  beneficiaryAdd,
  beneficiaryAddFailure,
} from '../../commands/beneficiary';
import { IAuthStackPages, IHomeStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectBeneficiary } from '../../state-management/selectors';

export function* addBeneficiarySaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IBeneficiaryTypes.BENEFICIARY_ADD, addBeneficiaryGenerator, httpConnection);
}

export function* listBeneficiarySaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IBeneficiaryTypes.BENEFICIARY_LIST, listBeneficiaryGenerator, httpConnection);
}

export function* addBeneficiaryGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IBeneficiaryAddCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    // api call - add beneficiary
    const api = BeneficiaryApi.getInstance(httpConnection);
    const beneficiary = yield call([api, api.addBeneficiary], payload);

    // update store
    const { beneficiaries: beneficiariesFromStore } = yield select(selectBeneficiary);
    if (beneficiariesFromStore) {
      beneficiariesFromStore.push(beneficiary);
      yield put(beneficiaryListed(beneficiariesFromStore));
    } else {
      yield put(beneficiaryListed([beneficiary]));
    }

    // nav back to beneficiary list
    yield call(navigate, { route: IHomeStackPages.BENEFICIARY_LIST });
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    if (error instanceof ServerError && error.statusCode === 400) {
      yield put(beneficiaryAddFailure(new BeneficiaryError.InvalidIBAN(error)));
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(beneficiaryAdd(payload));
    yield put(showUnknownError(error as Error));
  }
}

export function* listBeneficiaryGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    const { beneficiaries: beneficiariesFromStore } = yield select(selectBeneficiary);
    if (beneficiariesFromStore) {
      yield put(beneficiaryListed(beneficiariesFromStore));
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
