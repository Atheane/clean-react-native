import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';

import {
  Email,
  IGender,
  IRegisterIdentityCommand,
  Prospect,
  ISuccess,
  IRegisterPasswordCommand,
} from '@clean-rn/auth/domain';
import { HttpConnection } from '@clean-rn/shared/infrastructure';
import { AuthApi } from '@clean-rn/auth/infrastructure';

import {
  checkEmailGenerator,
  checkEmailSaga,
  registerIdentityGenerator,
  registerIdentitySaga,
  registerPasswordGenerator,
  registerPasswordSaga,
} from '../../usecases/signup';
import { ISignupTypes, emailChecked, identityRegistered, passwordRegistered } from '../../commands/signup';
import { selectEmail, selectProspect } from '../../../application/state-management';

describe('Signup - usecase', () => {
  const httpConnection = HttpConnection.getInstance(Constants.expoConfig?.extra?.BASE_URL_API);
  const api = AuthApi.getInstance(httpConnection);

  const mockIdentity: IRegisterIdentityCommand = {
    gender: IGender.MAN,
    firstName: 'John',
    lastName: 'Smith',
    nationality: 'FR',
  };

  const mockPassword: IRegisterPasswordCommand = {
    password: 'azekpoakz',
  };

  it('should wait for FETCH_CHECK_EMAIL action and call checkEmailApiSaga, should be done on next iteration', () => {
    const genObject = checkEmailSaga(httpConnection);

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.FETCH_CHECK_EMAIL, checkEmailGenerator, httpConnection),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call checkEmailSuccess actions', () => {
    const mockQueryEmail = {
      email: new Email('test@example.com'),
    };
    const mockSuccessFalse: ISuccess = {
      success: false,
    };

    testSaga(checkEmailGenerator, httpConnection, {
      type: ISignupTypes.FETCH_CHECK_EMAIL,
      payload: mockQueryEmail,
    })
      .next()
      .call([api, api.searchEmail], mockQueryEmail)
      .next(mockSuccessFalse)
      .put(
        emailChecked({
          success: mockSuccessFalse.success,
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
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerIdentity(mockIdentity);

    testSaga(registerIdentityGenerator, {
      type: ISignupTypes.REGISTER_IDENTITY,
      payload: mockIdentity,
    })
      .next()
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(identityRegistered(prospect))
      .next();
  });

  it('should wait for REGISTER_PASSWORD action and call registerIdentityGenerator, should be done on next iteration', () => {
    const genObject = registerPasswordSaga();

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.REGISTER_PASSWORD, registerPasswordGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call registerPassword actions', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerIdentity(mockIdentity);
    prospect.registerPassword(mockPassword.password);

    testSaga(registerPasswordGenerator, {
      type: ISignupTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .select(selectProspect)
      .next(prospect)
      .put(passwordRegistered(prospect))
      .next();
  });
});
