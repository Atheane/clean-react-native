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
  beneficiaryAddFailed,
  beneficiaryAdded,
  beneficiaryDeleteFailed,
  beneficiaryDeleted,
  resetError,
} from '../../commands/beneficiary';
import { IBeneficiaryStackPages } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';
import { selectBeneficiary } from '../../state-management/selectors';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';

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
    yield call(ensureTokenRefreshed, httpConnection);
    const api = BeneficiaryApi.getInstance(httpConnection);
    const beneficiary = yield call([api, api.addBeneficiary], payload);
    yield put(beneficiaryAdded(beneficiary));
    // nav to transfer
    const params = beneficiary?.accountId
      ? {
          beneficiaryAccountId: beneficiary.accountId,
          beneficiaryName: beneficiary.name,
        }
      : {
          beneficiaryId: beneficiary.beneficiaryId,
          beneficiaryName: beneficiary.name,
        };
    yield call(navigate, { route: IBeneficiaryStackPages.TRANSFER, params });
  } catch (error: unknown) {
    yield put(resetError());
    if (error instanceof ServerError && error.statusCode === 400) {
      yield put(beneficiaryAddFailed(new BeneficiaryError.BeneficiaryAlreadyExists(error.message)));
      yield cancel();
    }
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
    yield call(ensureTokenRefreshed, httpConnection);

    const api = BeneficiaryApi.getInstance(httpConnection);
    const beneficiary = yield call([api, api.deleteBeneficiary], payload);

    yield put(beneficiaryDeleted(beneficiary));
    yield call(navigate, { route: IBeneficiaryStackPages.BENEFICIARY_LIST, params: { idx: 0 } });
  } catch (error: unknown) {
    yield put(resetError());
    if (error instanceof ServerError && error.statusCode === 400) {
      yield put(beneficiaryDeleteFailed(new BeneficiaryError.BeneficiaryUnknown(error.message)));
      yield cancel();
    }
    yield put(showUnknownError(error as Error));
  }
}

export function* listBeneficiaryGenerator(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  try {
    const { beneficiaries: beneficiariesFromStore } = yield select(selectBeneficiary);

    if (beneficiariesFromStore) {
      yield put(beneficiariesListed(beneficiariesFromStore));
      yield call(navigate, { route: IBeneficiaryStackPages.MENU });
    } else {
      yield call(ensureTokenRefreshed, httpConnection);
      const api = BeneficiaryApi.getInstance(httpConnection);
      const beneficiaries: IBeneficiary[] = yield call([api, api.getBeneficiary]);
      yield put(beneficiariesListed(beneficiaries));
    }
  } catch (error: unknown) {
    yield put(resetError());
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(showUnknownError(error as Error));
  }
}
