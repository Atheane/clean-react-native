import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import { Email, IGender, IRegisterIdentityCommand, Prospect, ISuccess } from '@clean-rn/auth/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import {
  checkEmailGenerator,
  checkEmailSaga,
  registerIdentityGenerator,
  registerIdentitySaga,
} from '../../usecases/signup';
import { ISignupTypes, checkEmailSuccess, identityRegistered } from '../../commands/signup';
import { selectEmail } from '../../../application/state-management';

describe('Signup - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = AuthApi.getInstance(httpConnection);

  it('should wait for FETCH_CHECK_EMAIL action and call checkEmailApiSaga, should be done on next iteration', () => {
    const genObject = checkEmailSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_CHECK_EMAIL, checkEmailGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call checkEmailSuccess actions', () => {
    const query = {
      email: new Email('test@example.com'),
    };
    const mockResponse: ISuccess = {
      success: false,
    };

    testSaga(checkEmailGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_EMAIL,
      payload: query,
    })
      .next()
      .call([api, api.searchEmail], query)
      .next(mockResponse)
      .put(
        checkEmailSuccess({
          success: mockResponse.success,
        }),
      )
      .next();
  });

  it('should wait for REGISTER_IDENTITY action and call registerIdentityGenerator, should be done on next iteration', () => {
    const genObject = registerIdentitySaga();

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.REGISTER_IDENTITY, registerIdentityGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call registerIdentity actions', () => {
    const mockData: IRegisterIdentityCommand = {
      gender: IGender.MAN,
      firstName: 'John',
      lastName: 'Smith',
      nationality: 'FR',
    };

    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerIdentity(mockData);

    testSaga(registerIdentityGenerator, {
      type: ISignupTypes.REGISTER_IDENTITY,
      payload: mockData,
    })
      .next()
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(identityRegistered(prospect))
      .next();
  });
});
