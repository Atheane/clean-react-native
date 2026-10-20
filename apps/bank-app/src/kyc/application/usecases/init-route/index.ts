/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-fallthrough */
import { call, put, StrictEffect, takeEvery, cancel } from 'redux-saga/effects';

import { ServerError } from '@clean-rn/shared/infrastructure';

import { Customer } from '@clean-rn/kyc/domain';

import { IAuthStackPages, IKycStackPages, IRoutes } from '../../../../shared/presentation/types';
import { navigate } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { initializeKyc, IKycTypes, kycRouteInitialized } from '../../commands';

export function* initKycRouteSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(IKycTypes.INIT_KYC_ROUTE, initKycRouteGenerator);
}

export function* initKycRouteGenerator({
  payload,
}: {
  type: string;
  payload: {
    customer: Customer;
  };
}): Generator<StrictEffect, any, any> {
  try {
    const { status } = payload.customer.properties;
    let initRoute: IRoutes;
    switch (status) {
      case 'INIT':
        initRoute = IKycStackPages.INIT;
        break;
      case 'VALIDATED':
        initRoute = IKycStackPages.SUCCESS;
        break;
      default:
        initRoute = IKycStackPages.MENU;
        break;
    }

    yield put(kycRouteInitialized({ initRoute }));
  } catch (error: unknown) {
    // https://redux-saga.js.org/docs/basics/ErrorHandling/ expected error must be managed at the saga level
    if (error instanceof ServerError && error.statusCode === 401) {
      yield call(navigate, { route: IAuthStackPages.LOGIN });
      yield cancel();
    }
    // once app is well tested, delete this part and let onError hook manage unexpected errors
    yield put(initializeKyc());
    yield put(showUnknownError(error as Error));
  }
}
