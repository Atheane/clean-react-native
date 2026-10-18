/* eslint-disable @typescript-eslint/no-explicit-any */
import { StrictEffect, takeEvery } from 'redux-saga/effects';

import { Navigation } from '../../adapters/services/navigation';
import { IRoutes } from '../../types';
import { INavigationTypes } from '../../commands';

function navigateTo({ payload: { route } }: { type: string; payload: { route: IRoutes; params?: object } }) {
  Navigation.getInstance().navigate(route as never);
}

function navigateBack() {
  Navigation.getInstance().goBack();
}

function* navigateToSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(INavigationTypes.NAVIGATE_TO, navigateTo);
}

function* navigateBackSaga(): Generator<StrictEffect, any, any> {
  yield takeEvery(INavigationTypes.NAVIGATE_BACK, navigateBack);
}

export { navigateTo, navigateBack, navigateToSaga, navigateBackSaga };
