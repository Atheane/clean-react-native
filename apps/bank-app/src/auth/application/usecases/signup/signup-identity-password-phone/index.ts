import { call } from 'redux-saga/effects';
import { registerIdentitySaga } from './register-identity';
import { registerPasswordSaga } from './register-password';
import { checkPhoneSaga } from './check-phone';
import { HttpConnection } from '@clean-rn/shared/infrastructure';

export function* signupIdentityPasswordPhoneSaga(httpConnection: HttpConnection) {
  yield call(registerIdentitySaga);
  yield call(registerPasswordSaga);
  yield call(checkPhoneSaga, httpConnection);
}
