/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, StrictEffect, takeEvery, select, cancel } from 'redux-saga/effects';

import {
  BeneficiaryError,
  IBeneficiary,
  IAddBeneficiaryCommand,
  IDeleteBeneficiaryCommand,
} from '@clean-rn/beneficiary/domain';

import { HttpConnection, ServerError } from '@clean-rn/shared/infrastructure';
import { BeneficiaryApi } from '@clean-rn/beneficiary/infrastructure';

import {
  beneficiariesListed,
  IBeneficiaryTypes,
  initBeneficiary,
  beneficiaryAddFailure,
  beneficiaryAdded,
  beneficiaryDeleteFailure,
  beneficiaryDeleted,
} from '../../commands/beneficiary';
import { IAuthStackPages, IBeneficiaryStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectBeneficiary } from '../../state-management/selectors';

const sortByName = (beneficiaries: IBeneficiary[]) => {
  beneficiaries.sort((a: IBeneficiary, b: IBeneficiary) => {
    const nameA = a.name.toLowerCase(); // ignore upper and lowercase
    const nameB = b.name.toLowerCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

export function* addBeneficiarySaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IBeneficiaryTypes.ADD_BENEFICIARY, addBeneficiaryGenerator, httpConnection);
}

export function* deleteBeneficiarySaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IBeneficiaryTypes.DELETE_BENEFICIARY, deleteBeneficiaryGenerator, httpConnection);
}

export function* listBeneficiarySaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IBeneficiaryTypes.LIST_BENEFICIARIES, listBeneficiaryGenerator, httpConnection);
}

export function* addBeneficiaryGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IAddBeneficiaryCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    // api call - add beneficiary
    const api = BeneficiaryApi.getInstance(httpConnection);
    const beneficiary = yield call([api, api.addBeneficiary], payload);
    yield put(beneficiaryAdded(beneficiary));
    // nav back to beneficiary list
    yield call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST, params: { idx: 0 } });
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    if (error instanceof ServerError && error.statusCode === 400) {
      yield put(beneficiaryAddFailure(new BeneficiaryError.BeneficiaryAlreadyExists(error.message)));
      yield cancel();
    }
    yield put(initBeneficiary());
    yield put(showUnknownError(error as Error));
  }
}

export function* deleteBeneficiaryGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IDeleteBeneficiaryCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    // api call - delete beneficiary
    const api = BeneficiaryApi.getInstance(httpConnection);
    const beneficiary = yield call([api, api.deleteBeneficiary], payload);

    yield put(beneficiaryDeleted(beneficiary));

    // nav back to beneficiary list
    yield call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST, params: { idx: 0 } });
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    if (error instanceof ServerError && error.statusCode === 400) {
      yield put(beneficiaryDeleteFailure(new BeneficiaryError.BeneficiaryUnknown(error.message)));
      yield cancel();
    }
    yield put(initBeneficiary());
    yield put(showUnknownError(error as Error));
  }
}

export function* listBeneficiaryGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    const { beneficiaries: beneficiariesFromStore } = yield select(selectBeneficiary);

    if (beneficiariesFromStore) {
      yield put(beneficiariesListed(beneficiariesFromStore));
      yield call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST });
    } else {
      const api = BeneficiaryApi.getInstance(httpConnection);
      const beneficiaries: IBeneficiary[] = yield call([api, api.getBeneficiary]);
      sortByName(beneficiaries);
      yield put(beneficiariesListed(beneficiaries));
      yield call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST, params: { idx: 0 } });
    }
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initBeneficiary());
    yield put(showUnknownError(error as Error));
  }
}
