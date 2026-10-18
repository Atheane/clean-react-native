import { takeEvery } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import Constants from 'expo-constants';
import dayjs from 'dayjs';

import {
  Email,
  IGender,
  IRegisterIdentityCommand,
  Prospect,
  ISuccess,
  IRegisterPasswordCommand,
  IRegisterBirthCommand,
  IRegisterAddressCommand,
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
  registerBirthGenerator,
  registerBirthSaga,
  registerAddressSaga,
  registerAddressGenerator,
} from '../../usecases/signup';
import {
  ISignupTypes,
  addressRegistered,
  birthRegistered,
  emailChecked,
  identityRegistered,
  passwordRegistered,
} from '../../commands/signup';
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

  const mockBirth: IRegisterBirthCommand = {
    birthday: dayjs('1980-01-01'),
    birthCountry: 'FR',
  };

  const mockAddress: IRegisterAddressCommand = {
    str: 'fake address',
    city: 'string',
    zip: 'string',
    country: 'GR',
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

  it('should call registerIdentity actions if prospect exists', () => {
    const prospectPrev = Prospect.Create(new Email('test@example.com'));
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerIdentity(mockIdentity);

    testSaga(registerIdentityGenerator, {
      type: ISignupTypes.REGISTER_IDENTITY,
      payload: mockIdentity,
    })
      .next()
      .select(selectProspect)
      .next(prospectPrev)
      .put(identityRegistered(prospect))
      .next();
  });

  it('should call registerIdentity actions if no prospect', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerIdentity(mockIdentity);

    testSaga(registerIdentityGenerator, {
      type: ISignupTypes.REGISTER_IDENTITY,
      payload: mockIdentity,
    })
      .next()
      .select(selectProspect)
      .next(null)
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(identityRegistered(prospect))
      .next();
  });

  it('should wait for REGISTER_PASSWORD action and call registerPasswordGenerator, should be done on next iteration', () => {
    const genObject = registerPasswordSaga();

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.REGISTER_PASSWORD, registerPasswordGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call registerPassword actions if prospect exists', () => {
    const prospectPreviousState = Prospect.Create(new Email('test@example.com'));
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerPassword(mockPassword.password);

    testSaga(registerPasswordGenerator, {
      type: ISignupTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .select(selectProspect)
      .next(prospectPreviousState)
      .put(passwordRegistered(prospect))
      .next();
  });

  it('should call registerPassword actions if no prospect', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerPassword(mockPassword.password);

    testSaga(registerPasswordGenerator, {
      type: ISignupTypes.REGISTER_PASSWORD,
      payload: mockPassword,
    })
      .next()
      .select(selectProspect)
      .next(null)
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(passwordRegistered(prospect))
      .next();
  });

  it('should wait for REGISTER_BIRTH action and call registerBirthGenerator, should be done on next iteration', () => {
    const genObject = registerBirthSaga();

    expect(genObject.next().value).toEqual(takeEvery(ISignupTypes.REGISTER_BIRTH, registerBirthGenerator));
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call registerBirth actions if prospect exists', () => {
    const prospectPreviousState = Prospect.Create(new Email('test@example.com'));

    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerBirth(mockBirth);

    testSaga(registerBirthGenerator, {
      type: ISignupTypes.REGISTER_BIRTH,
      payload: mockBirth,
    })
      .next()
      .select(selectProspect)
      .next(prospectPreviousState)
      .put(birthRegistered(prospect))
      .next();
  });

  it('should call registerBirth actions if no prospect', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerBirth(mockBirth);

    testSaga(registerBirthGenerator, {
      type: ISignupTypes.REGISTER_BIRTH,
      payload: mockBirth,
    })
      .next()
      .select(selectProspect)
      .next(null)
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(birthRegistered(prospect))
      .next();
  });

  it('should wait for REGISTER_ADDRESS action and call registerAddressGenerator, should be done on next iteration', () => {
    const genObject = registerAddressSaga();

    expect(genObject.next().value).toEqual(
      takeEvery(ISignupTypes.REGISTER_ADDRESS, registerAddressGenerator),
    );
    expect(genObject.next().done).toBeTruthy();
  });

  it('should call registerAddress actions if prospect exists', () => {
    const prospectPreviousState = Prospect.Create(new Email('test@example.com'));

    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerAddress(mockAddress);

    testSaga(registerAddressGenerator, {
      type: ISignupTypes.REGISTER_ADDRESS,
      payload: mockAddress,
    })
      .next()
      .select(selectProspect)
      .next(prospectPreviousState)
      .put(addressRegistered(prospect))
      .next();
  });

  it('should call registerAddress actions if no prospect', () => {
    const prospect = Prospect.Create(new Email('test@example.com'));
    prospect.registerAddress(mockAddress);

    testSaga(registerAddressGenerator, {
      type: ISignupTypes.REGISTER_ADDRESS,
      payload: mockAddress,
    })
      .next()
      .select(selectProspect)
      .next(null)
      .select(selectEmail)
      .next(new Email('test@example.com'))
      .put(addressRegistered(prospect))
      .next();
  });
});
