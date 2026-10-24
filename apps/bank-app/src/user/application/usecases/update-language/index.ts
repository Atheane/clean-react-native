/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable no-fallthrough */
import { call, cancel, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { IUpdateUserConfigCommand, ILanguage } from '@clean-rn/user/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { UserApi } from '@clean-rn/user/infrastructure';

import { goBack } from '../../../../shared/presentation/navigation/navigationRef';
import { showUnknownError } from '../../../../shared/application/commands/manage-global-errors';

import { IUserTypes, languageUpdated, resetError } from '../../../../user/application/commands';
import { ensureTokenRefreshed } from '../../../../shared/application/usecases/ensureTokenRefreshed';
import i18n from '../../../../shared/presentation/i18n';

export function* updateLanguageSaga(httpConnection: HttpConnection): Generator<StrictEffect, any, any> {
  yield takeEvery(IUserTypes.FETCH_UPDATE_LANGUAGE, updateLanguageGenerator, httpConnection);
}

const mapLanguageToi18n = (lg: ILanguage) => {
  if (lg === ILanguage.EL) {
    return 'el';
  }
  return lg.toLowerCase();
};

export function* updateLanguageGenerator(
  httpConnection: HttpConnection,
  {
    payload,
  }: {
    type: string;
    payload: IUpdateUserConfigCommand;
  },
): Generator<StrictEffect, any, any> {
  try {
    if (!payload.lang) {
      yield cancel();
    }
    yield call(ensureTokenRefreshed, httpConnection);
    const userApi = UserApi.getInstance(httpConnection);
    const user = yield call([userApi, userApi.updateConfig], payload);
    yield call(i18n.changeLanguage, mapLanguageToi18n(payload.lang as ILanguage));
    yield put(
      languageUpdated({
        user,
      }),
    );
    yield call(goBack);
  } catch (error: unknown) {
    yield put(resetError()); // pending : false in reducer, user is actually kept.
    yield put(showUnknownError(error as Error));
  }
}
